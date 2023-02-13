from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, FloatField, IntegerField
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
    user_id = IntegerField("User Id")
    title = StringField('Title', validators=[DataRequired()])
    artist = StringField('Artist', validators=[DataRequired()])
    genre = SelectField("Genre", choices=[(g, g) for g in genres])
    description = StringField('Description')
    song_image_url = StringField("Upload Image URL")
    song_url= StringField("Song URL")
    length =  FloatField("Song length")
    submit = SubmitField("Submit")
