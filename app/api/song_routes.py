from flask import Blueprint, request, redirect, render_template
from app.models import Song, User, db
from flask_login import login_required, current_user
from app.forms import SongForm
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)


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


@song_routes.route('/', methods=['POST'])
# @login_required
def create_song():
    print("what is going on in miami")
    form = SongForm()
    print("what is my form", list(form))
    # if 'csrf_token' in request.cookies:
    form['csrf_token'].data = request.cookies['csrf_token']
    print('csrf w.e', form['csrf_token'].data)

    if form.validate_on_submit():

        print("what is going on in miami 3")

        print("form data", form.data)
        new_song = Song(
            user_id = current_user.id,
            title = form.data["title"],
            artist = form.data["artist"],
            genre = form.data["genre"],
            length = form.data["length"],
            description = form.data["description"],
            song_image_url = form.data["song_image_url"],
            song_url = form.data["song_url"]
        )

        print("new_song check", new_song)

        db.session.add(new_song)
        db.session.commit()
        # song = Song.query.filter(Song.id == new_song.id).first()
        return new_song.to_dict()

    print("outside of if statement - headed for failure")
    # print(new_song)
    if form.errors:
        return {"errors":form.errors}, 400

@song_routes.route('/upload-song', methods=['POST'])
# @login_required
def upload_song():
    if "song" not in request.files:
        return {"errors":"song required"}, 400

    print("is the song wrong")
    song = request.files['song']
    print('song thing', song)

    if not allowed_file(song.filename):
        print("file type not permitted")
        return {"errors": "file type not permitted"}, 400

    print("what is going on in miami 2")
    song.filename = get_unique_filename(song.filename)

    upload = upload_file_to_s3(song)
    print('upload', upload)

    if "url" not in upload:
        print("error upload")
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return {"errors": upload }, 400

    url = upload["url"]
    print('url', url)
    return {"url": url}


@song_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_song(id):
    song = Song.query.get(id)

    if not song:
        return {"Error":"Song not found"}

    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        song.title = form.data["title"]
        song.artist = form.data["artist"]
        song.genre = form.data["genre"]
        song.description = form.data["description"]
        song.song_image_url = form.data["song_image_url"]

        db.session.add(song)
        db.session.commit()

        return song.to_dict()


    if form.errors:
        return {"errors": form.errors}

@song_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_song(id):
    song = Song.query.get(id)

    if not song:
        return {"Error": "Song not found"}

    db.session.delete(song)
    db.session.commit()
    return {"message": "Delete successful"}
