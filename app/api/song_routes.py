from flask import Blueprint, request, redirect, render_template
from app.models import Song, User, db
from flask_login import login_required, current_user
from app.forms import SongForm
import app.s3_helpers as s3
# ( upload_file_to_s3, upload_image_file_to_s3, audio_file, get_unique_filename, image_file)


song_routes = Blueprint('songs', __name__)

# get all songs for our feed page
@song_routes.route('/')
def songs():
    """
      Query for all songs and returns them in a list of song dictionaries
    """
    songs = Song.query.all()
    return [song.to_dict() for song in songs]


@song_routes.route("/<int:id>")
@login_required
def get_song(id):
    song = Song.query.get(id)

    if not song:
        return {"Error": "Song not found"}

    return song.to_dict()


# @song_routes.route('/', methods=['POST'])
# # @login_required
# def create_song():
#     print("what is going on in miami")
#     form = SongForm()
#     print("what is my form", list(form))
#     # if 'csrf_token' in request.cookies:
#     form['csrf_token'].data = request.cookies['csrf_token']
#     print('csrf w.e', form['csrf_token'].data)

#     if form.validate_on_submit():

#         print("what is going on in miami 3")

#         print("form data", form.data)
#         new_song = Song(
#             user_id = current_user.id,
#             title = form.data["title"],
#             artist = form.data["artist"],
#             genre = form.data["genre"],
#             length = form.data["length"],
#             description = form.data["description"],
#             song_image_url = form.data["song_image_url"],
#             song_url = form.data["song_url"]
#         )

#         print("new_song check", new_song)

#         db.session.add(new_song)
#         db.session.commit()
#         # song = Song.query.filter(Song.id == new_song.id).first()
#         return new_song.to_dict()

#     print("outside of if statement - headed for failure")
#     # print(new_song)
#     if form.errors:
#         return {"errors":form.errors}, 400

@song_routes.route('/', methods=['POST'])
@login_required
def upload_song():
    if "song" not in request.files:
        return {"errors":"song required"}, 400


    url_image = "https://user-images.githubusercontent.com/110946315/218864866-8fe7c616-38fc-460c-a177-1e2065ea8fca.jpeg"

    if "picture" in request.files:
        picture = request.files["picture"]

        if not s3.image_file(picture.filename):
            print("file type not permitted")
            return {"errors": "file type not permitted"}, 400

        picture.filename = s3.get_unique_filename(picture.filename)

        upload_image = s3.upload_image_file_to_s3(picture)

        if "url" not in upload_image:
            print("error upload")
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return {"errors": upload_image }, 400

        url_image = upload_image["url"]

    song = request.files['song']

    if not s3.audio_file(song.filename):
        print("file type not permitted")
        return {"errors": "file type not permitted"}, 400

    song.filename = s3.get_unique_filename(song.filename)

    upload = s3.upload_file_to_s3(song)

    if "url" not in upload:
        print("error upload")
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return {"errors": upload }, 400


    song_url = upload["url"]
    form_data = request.form.to_dict()

    new_song = Song(
            user_id = current_user.id,
            title = form_data["title"],
            artist = form_data["artist"],
            genre = form_data["genre"],
            length = form_data["length"],
            description = form_data["description"],
            song_image_url = url_image,
            song_url = song_url
        )

    db.session.add(new_song)
    db.session.commit()
    return new_song.to_dict()


@song_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_song(id):
    song = Song.query.get(id)

    if not song:
        return {"Error":"Song not found"}

    image_url = song.song_image_url

    if "picture" in request.files:
        # We need to first delete the existing image in the database for the song
        imageKey = song.song_image_url.rsplit('/')[-1]
        s3.remove_image_file_from_s3(imageKey)

        # Next, upload the image to AWS
        picture = request.files["picture"]

        if not s3.image_file(picture.filename):
            print("file type not permitted")
            return {"errors": "file type not permitted"}, 400

        picture.filename = s3.get_unique_filename(picture.filename)

        upload_image = s3.upload_image_file_to_s3(picture)

        if "url" not in upload_image:
            print("error upload")
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return {"errors": upload_image }, 400

        image_url = upload_image["url"]

    form_data = request.form.to_dict()

    song.title = form_data["title"]
    song.artist = form_data["artist"]
    song.genre = form_data["genre"]
    song.description = form_data["description"]
    song.song_image_url = image_url

    db.session.add(song)
    db.session.commit()

    return song.to_dict()


@song_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_song(id):
    song = Song.query.get(id)

    if not song:
        return {"Error": "Song not found"}

    songKey = song.song_url.rsplit('/')[-1]
    imageKey = song.song_image_url.rsplit('/')[-1]

    s3.remove_file_from_s3(songKey)
    s3.remove_image_file_from_s3(imageKey)

    db.session.delete(song)
    db.session.commit()
    return {"message": "Delete successful"}
