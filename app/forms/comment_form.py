from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length



class CommentForm(FlaskForm):
    song_id = IntegerField('song_id')
    user_id =IntegerField('user_id')
    body = StringField('body', validators=[DataRequired(), Length(max=255, message='Comments be between 2 and 255 characters'), Length(min=2, message='Comments be between 2 and 255 characters')])
