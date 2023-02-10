from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Comments(db.Model):
    __tablename__="comments"\

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    body =db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeinKey(add_prefix_for_prod("users.id")), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")), nullable=False)
    time = db.Column(db.Decimal, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow())
