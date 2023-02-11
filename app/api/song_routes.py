from flask import Blueprint
from app.models import Song, User
from flask_login import login_required

song_routes = Blueprint('songs', __name__)

@song_routes.route('/')

def songs():
    """
      Query for all songs and returns them in a list of song dictionaries
    """
