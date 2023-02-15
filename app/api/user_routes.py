from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Comment, db
from app.forms import UserForm

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

    form = UserForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user.display_name = form.data["display_name"]
        user.first_name = form.data['first_name']
        user.last_name = form.data["last_name"]
        user.city = form.data["city"]
        user.country =form.data["country"]
        user.bio = form.data["bio"]
        user.profile_image_url = form.data["profile_image_url"]
        # user.header_image_url = form.data["header_image_url"]

        db.session.add(user)
        db.session.commit()

        return user.to_dict()

    if form.errors:
        return {"errors": form.errors}
