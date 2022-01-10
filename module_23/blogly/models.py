'''
First, create a User model for SQLAlchemy. Put this in a models.py file.

It should have the following columns:

id, an autoincrementing integer number that is the primary key
first_name and last_name
image_url for profile images
'''

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

def connect_db(app):
    '''Connect to database.'''
    db.app = app
    db.init_app(app)
    pass 

class User(db.Model):
    '''User'''
    __tablename__ = 'users'

    id = db.Column(db.Integer,
    primary_key=True,
    autoincrement=True,
    unique = True)

    first_name = db.Column(db.String(50),
    nullable = False)

    last_name = db.Column(db.String(50),
    nullable = False)

    img_url = db.Column(db.Text(), nullable = True)

    __table_args__ = (db.UniqueConstraint('first_name', 'last_name', name='uix_1'), )
    

    def __repr__(self):
        '''Show info about the user object'''
        u = self
        return f"User {u.id}: {u.first_name} {u.last_name} displays {u.img_url}"

class Post(db.Model):

    __tablename__ = 'posts'
    id = db.Column(db.Integer, 
    primary_key = True,
    autoincrement = True,
    unique = True)

    title = db.Column(db.String(200),
    nullable = False)

    content = db.Column(db.Text(), nullable = False)

    created_at = db.Column(db.Text, 
    nullable = False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        '''Show info about the post object'''
        u = self
        return f"User {u.user_id} post titled {u.title} from {u.created_at}"