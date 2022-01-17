from flask_wtf import FlaskForm 
from wtforms import StringField, IntegerField, BooleanField, TextAreaField
from wtforms.validators import InputRequired, Optional, URL, AnyOf, NumberRange

class CreateUserForm(FlaskForm):
    '''Form for creating a new User'''
    username= StringField("Username", validators = [InputRequired()])
    password = StringField("Password", validators=[InputRequired()])
    email = StringField("Email", validators =[InputRequired()])
    first_name = StringField("First Name", validators =[InputRequired()])
    last_name = StringField("Last Name", validators =[InputRequired()])

class LoginUserForm(FlaskForm):
    '''Form for creating a new User'''
    username= StringField("Username", validators = [InputRequired()])
    password = StringField("Password", validators=[InputRequired()])


class CreateFeedbackForm(FlaskForm):
    '''Form for creating additional feedback'''
    title = StringField('Title', validators=[InputRequired()])
    content = TextAreaField('Content', validators=[Optional()])
    username = StringField('Username', validators=[InputRequired()])
