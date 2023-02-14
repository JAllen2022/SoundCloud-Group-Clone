from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Comment(db.Model):
    __tablename__="comments"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    body =db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")), nullable=False)
    time = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow())

    user = db.relationship("User", back_populates="comments")
    song = db.relationship("Song", back_populates="comments")

    def to_dict(self):
        return {
            "id": self.id,
            "body": self.body,
            "user_id": self.user_id,
            "song_id":self.song_id,
            "time": self.time,
            "created_at": self.created_at,
            "user": self.user.to_dict()
        }


# def serialize_comment(comment):
#     if isinstance(comment, Comment):
#         return comment.to_json()
#     raise TypeError("Object of type Comment is not JSON serializable")
