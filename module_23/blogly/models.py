'''
First, create a User model for SQLAlchemy. Put this in a models.py file.

It should have the following columns:

id, an autoincrementing integer number that is the primary key
first_name and last_name
image_url for profile images
'''



from enum import auto
from flask_sqlalchemy import SQLAlchemy

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
    autoincrement=True)

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

