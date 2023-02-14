from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, DecimalField, IntegerField
from wtforms.validators import DataRequired

genres = [
    "Alternative Rock",
    "Ambient",
    "Classical",
    "Dance & EDM",
    "Dancehall",
    "Deep House",
    "Disco",
    "Drum & Bass",
    "Dubstep",
    "Electronic",
    "Folks & Singer-Songwriter",
    "Hip-hop & Rap",
    "House",
    "Indie",
    "Jazz & Blues",
    "Latin",
    "Metal",
    "Piano",
    "R&B & Soul",
    "Reggaeton",
    "Rock",
    "Soundtrack",
    "Techno",
    "Trance",
    "Trap",
    "Triphop",
    "World"
]

class SongForm(FlaskForm):
    title = StringField('Title')
    artist = StringField('Artist')
    genre = StringField("Genre")
    description = StringField('Description')
    song_image_url = StringField("Upload Image URL")
    song_url= StringField("Song URL")
    length =  DecimalField("Song length")
