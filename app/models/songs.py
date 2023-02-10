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
    description = db.Column(db.String(255), nullable=False)
    length = db.Column(db.Float, nullable=False)
    song_url = db.Column(db.String(255), nullable=False)
    song_image_url = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow())

    user = db.relationship("User", back_populates = "songs")
    song_likes = db.relationship("User", secondary=likes, back_populates="user_likes", cascade="all, delete")
