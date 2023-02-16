from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Comment, db
from app.forms import UserForm
import app.s3_helpers as s3

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by userId and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


# Get all comments by user id
@user_routes.route("/<int:userId>/comments")
def get_user_comments(id):
    """
      Query for all comments by userId
    """
    user = User.query.get(id)
    comments = Comment.query.filter(Comment.user_id == user.id).order_by(Comment.created_at).all()

    if comments:
        return [comment.to_dict() for comment in comments]
    else:
        return {"Error": "No Comments Found"}


@user_routes.route("/<int:id>/likes")
def get_user_likes(id):
    """
      Query for all likes by userId
    """

    user = User.query.get(id)
    likes = user.user_likes
    return [like.to_dict() for like in likes]


@user_routes.route("/<int:id>/songs")
def get_user_songs(id):
    """
      Query for all songs by userId
    """
    user = User.query.get(id)
    songs = user.songs
    return [song.to_dict() for song in songs]



@user_routes.route("/<int:id>",  methods=["PUT"])
@login_required
def edit_user(id):
    """
      Route to edit the user profile
    """
    user = User.query.get(id)
    if not user:
        return {"Error": "User not found"}, 404

    profile_image_url = user.profile_image_url

    if "profile_picture" in request.files:
        # We need to first delete the existing image in the database for the song
        if profile_image_url:
            imageKey = user.profile_image_url.rsplit('/')[-1]
            s3.remove_image_file_from_s3(imageKey)

        # Next, upload the image to AWS
        profile_picture = request.files["profile_picture"]

        if not s3.image_file(profile_picture.filename):
            print("file type not permitted")
            return {"errors": "file type not permitted"}, 400

        profile_picture.filename = s3.get_unique_filename(profile_picture.filename)

        upload_image = s3.upload_image_file_to_s3(profile_picture)

        if "url" not in upload_image:
            print("error upload")
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return {"errors": upload_image }, 400

        profile_image_url = upload_image["url"]

    form_data = request.form.to_dict()

    user.display_name = form_data["display_name"]
    user.first_name = form_data['first_name']
    user.last_name = form_data["last_name"]
    user.city = form_data["city"]
    user.country =form_data["country"]
    user.bio = form_data["bio"]
    user.profile_image_url = profile_image_url
    # user.header_image_url = header_image_url

    # user.header_image_url = form.data["header_image_url"]

    db.session.add(user)
    db.session.commit()

    return user.to_dict()

@user_routes.route('/<int:id>/header-image', methods=['POST'])
@login_required
def set_header(id):

    user = User.query.get(id)

    if not user:
        return {"Error": "User not found"}, 404

    header_image_url = user.header_image_url

    if "header_picture" in request.files:
        # We need to first delete the existing image in the database for the song
        if header_image_url:
            imageKey = user.header_image_url.rsplit('/')[-1]
            s3.remove_image_file_from_s3(imageKey)

        # Next, upload the image to AWS
        header_picture = request.files["header_picture"]

        if not s3.image_file(header_picture.filename):
            print("file type not permitted")
            return {"errors": "file type not permitted"}, 400

        header_picture.filename = s3.get_unique_filename(header_picture.filename)

        upload_image = s3.upload_image_file_to_s3(header_picture)

        if "url" not in upload_image:
            print("error upload")
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return {"errors": upload_image }, 400

        header_image_url = upload_image["url"]

    user.header_image_url = header_image_url

    db.session.add(user)
    db.session.commit()

    return user.to_dict()
