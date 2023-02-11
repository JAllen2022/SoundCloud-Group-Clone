from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
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
    "Tecno",
    "Trance",
    "Trap",
    "Triphop",
    "World"
]

class SongForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    artist = StringField('Artist', validators=[DataRequired()])
    genre = SelectField("Genre", choices=[(g, g) for g in genres])
    description = StringField('Description')
    song_image_url = StringField("Upload Image URL")
