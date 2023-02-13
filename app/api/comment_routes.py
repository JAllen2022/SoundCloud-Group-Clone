from flask import Blueprint, request, redirect, render_template
from app.models import Song, User, Comment, db
from flask_login import login_required, current_user
from .song_routes import song_routes
from app.forms import SongForm, CommentForm
import datetime
import json

comment_routes = Blueprint("comments", __name__)

# Get all song comments by song id
@song_routes.route("/<int:id>/comments")
def song_comments(id):
    """
      Query for all comments and with this song_id
    """
    comments = Comment.query.filter(Comment.song_id == id).order_by(Comment.created_at).all()

    if comments:
        # return [json.dumps(comment.to_dict() for comment in comments)]
        return [comment.to_dict() for comment in comments]
    else:
        return {"Error": "No Comments Found"}

# Create a comment
@song_routes.route("/<int:id>/comments", methods=["POST"])
@login_required
def create_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment = Comment(
            body = form.data["body"],
            user_id = current_user.id,
            song_id = id,
            time = 1.20,
            created_at = datetime.datetime.now()
        )
        db.session.add(comment)
        db.session.commit()
        # comments = Comment.query.filter(Comment.song_id == id).all()
        # return [comment.to_dict() for comment in comments]
        return comment.to_dict()
    return {"Error": "Could not create comment"}



############################################### comment specific #######################################


# Edit a comment by comment id
@comment_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_comment(id):
    form = CommentForm()
    comment = Comment.query.get(id)

    if current_user.id == comment.user_id:
        comment.body = form.data['body']

        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    else:
        return { "Error": 'Could not edit comment'}

# Delete a comment by comment id
@comment_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    if not comment:
        return {"Error": "Comment not found"}

    db.session.delete(comment)
    db.session.commit()
    return{"message": "Delete successful"}
