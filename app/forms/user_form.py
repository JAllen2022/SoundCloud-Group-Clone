from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class UserForm(FlaskForm):
    email=StringField('Email')
    display_name=StringField('Display Name')
    first_name=StringField('First Name')
    last_name=StringField('Last Name')
    city=StringField('City')
    country=StringField('Country')
    bio=StringField('Bio', validators=[Length(min=0, max=255, message='Max 255 characters')])
    profile_image_url=StringField('Profile Image')
    header_image_url=StringField('Display Image')
