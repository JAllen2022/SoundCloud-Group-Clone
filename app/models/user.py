from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .likes import likes


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    display_name = db.Column(db.String(30))
    first_name = db.Column(db.String(30))
    last_name = db.Column(db.String(30))
    hashed_password = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(100))
    country= db.Column(db.String(100))
    bio = db.Column(db.String(255))
    profile_image_url = db.Column(db.String(255))
    header_image_url = db.Column(db.String(255))

    songs = db.relationship("Song", back_populates="user", cascade="all, delete")
    user_likes = db.relationship("Song", secondary=likes, back_populates="song_likes", cascade="all, delete")
    comments = db.relationship("Comment", back_populates="user", cascade="all, delete")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'display_name': self.display_name,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'city': self.city,
            'country': self.country,
            'bio': self.bio,
            'profile_image_url': self.profile_image_url,
            'header_image_url': self.header_image_url,
            'num_user_likes': len(self.user_likes),
            # "comments": [com.to_dict() for com in self.comments]
        }
