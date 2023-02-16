from .db import db, environment, SCHEMA, add_prefix_for_prod
from .likes import likes
import datetime

class Song(db.Model):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    artist = db.Column(db.String(255), nullable=False)
    genre = db.Column(db.String(30))
    description = db.Column(db.String(255))
    length = db.Column(db.Float, nullable=False)
    song_url = db.Column(db.String(255))
    song_image_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow())

    user = db.relationship("User", back_populates = "songs")
    song_likes = db.relationship("User", secondary=likes, back_populates="user_likes")
    comments = db.relationship("Comment", back_populates="song", cascade="all, delete")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "artist": self.artist,
            # "genre": self.genre,
            # "description": self.description,
            "length": self.length,
            "song_url": self.song_url,
            "song_image_url": self.song_image_url,
            "created_at": self.created_at,
            "user": self.user.to_dict(),
            "like_count":len(self.song_likes), # [ <User1>, <User2>, <User3> ]
            "comment_count":len(self.comments), # [ <User1>, <User2>, <User3> ]
            # "comments": [com.to_dict() for com in self.comments]
        }

    def to_dict_single_song(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "artist": self.artist,
            "genre": self.genre,
            "description": self.description,
            "length": self.length,
            "song_url": self.song_url,
            "song_image_url": self.song_image_url,
            "created_at": self.created_at,
            "user": self.user.to_dict(),
            "like_count":len(self.song_likes), # [ <User1>, <User2>, <User3> ]
            "comment_count":len(self.comments), # [ <User1>, <User2>, <User3> ]
            "comments": [com.to_dict() for com in self.comments],
            "song_likes": {user.id:user.to_dict() for user in self.song_likes}
        }
