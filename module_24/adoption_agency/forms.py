from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, TextAreaField
from wtforms.validators import InputRequired, Optional, URL, AnyOf, NumberRange


class CreatePetForm(FlaskForm):
    '''Form for creating a new pet'''
    name = StringField("Pet Name", validators=[InputRequired()])
    species = StringField("Species", validators=[
                          AnyOf(['dog', 'cat', 'porcupine'])])
    photo_url = StringField("Image URL", validators=[URL(), Optional()])
    age = IntegerField("Age (years)", validators=[
                       NumberRange(0, 30), Optional()])
    notes = TextAreaField("Notes")
    available = BooleanField("Available?")
