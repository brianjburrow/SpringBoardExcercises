from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

db = SQLAlchemy()


def db_connect(app):
    db.app = app
    db.init_app(app)
    pass
    
class User(db.Model):
    __tablename__ = 'users'

    username = db.Column(db.String(20), primary_key=True)

    password = db.Column(db.Text, nullable = False)

    email = db.Column(db.String(50), nullable = False)

    first_name = db.Column(db.String(30), nullable = False) 
    last_name = db.Column(db.String(30), nullable = False)

    @classmethod
    def register(cls, username, pwd):
        '''Register user with hashed password and return user.'''
        hashed = bcrypt.generate_password_hash(pwd)
        # turn bytestring into normal  (unicode utf8) string
        hashed_utf8 = hashed.decode('utf8')
        return cls(username = username, password=hashed_utf8)

    @classmethod
    def authenticate(cls, username, pwd):
        '''Validate that user exists and password is correct.
        Return user if valid; else return False
        '''
        u = User.query.filter_by(username=username).first()

        if u and bcrypt.check_password_hash(u.password, pwd):
            # return user instance
            return u 
        else:
            return False
        


class Feedback(db.Model):
    __tablename__ = 'feedbacks'

    id = db.Column(db.Integer, primary_key = True, autoincrement =True)
    title = db.Column(db.String(100), nullable = False)
    content = db.Column(db.Text, nullable = True)
    username = db.Column(db.String(20), db.ForeignKey('users.username'), nullable = False)

