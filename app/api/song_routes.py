from flask import Blueprint, request, redirect, render_template
from app.models import Song, User, db
from flask_login import login_required, current_user
from app.forms import SongForm


song_routes = Blueprint('songs', __name__)

@song_routes.route('/')
def songs():
    """
      Query for all songs and returns them in a list of song dictionaries
    """
    songs = Song.query.all()
    return {"Songs":[song.to_dict() for song in songs]}
    #~~~~~~~~~~~~~~~~~~~~~~ We need a .to_dict() method for all our models ~~~~~~~~~~~~

@song_routes.route('/new_song', methods=['POST'])
@login_required
def create_song():
    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_song = Song(
            user_id = current_user.id,
            title = form.data["title"],
            artist = form.data["artist"],
            genre = form.data["genre"],
            # length = 3.50,
            description = form.data["description"],
            song_image_url = form.data["song_image_url"]
        )

        db.session.add(new_song)
        db.session.commit()

        return redirect(f'/api/songs/{new_song.id}')

    if form.errors:
        return {"errors":form.errors}, 400

    return render_template('create_song.html', form=form)

@song_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_song():
    song = Song.query.get(id)

    if not song:
        return {"Error":"Song not found"}

    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        song.title = form.data["title"]
        song.artist = form.data["artist"]
        song.genre = form.data["genre"]
        song.description = form.data["description"]
        song.song_image_url = form.data["song_image_url"]

        db.session.add(song)
        db.session.commit()
        return redirect(f'/api/songs/{song.id}')

    if form.errors:
        return {"errors": form.errors}

@song_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_song():
    song = Song.query.get(id)

    if not song:
        return {"Error": "Song not found"}

    db.session.delete(song)
    db.session.commit()
    return {"message": "Delete successful"}
