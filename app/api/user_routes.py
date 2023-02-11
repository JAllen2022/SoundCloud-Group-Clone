from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Comment

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
        return { "comments": [comment.todict() for comment in comments] }
    else:
        return {"Error": "No Comments Found"}


@user.routes.route("/<int:id>/likes")
def get_user_likes(id):
    """
      Query for all likes by userId
    """

    user = User.query.get(id)
    likes = user.user_likes.query.all()
    return {"likes": [like.to_dict() for like in likes]}
