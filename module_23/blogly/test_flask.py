from unittest import TestCase

from app import app
from models import User, db 

# USE test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

# MAKE FLASK ERRORS BE REAL ERRORS, RATHER THAN HTML PAGES WITH ERROR INFO
app.config['TESTING'] = True 
#THIS IS A BIT OF A HACK, BUT DON'T USE FLASK DEBUGTOOLBAR
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()

BASE_IMG = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'

class UserViewsTestCase(TestCase):
    ''' Tests for views for users '''

    def setUp(self):
        '''add a sample user'''
        User.query.delete()

        user = User(first_name = 'Brian', 
        last_name = 'Burrows', 
        img_url = BASE_IMG)

        db.session.add(user)
        db.session.commit()

        self.user_id = user.id
        pass

    def tearDown(self):
        db.session.rollback()
        pass
    
    def test_list_users(self):
        with app.test_client() as client:
            resp = client.get("/users")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Brian', html)
            self.assertIn('Burrows', html)
        pass

    def test_show_user(self):
        with app.test_client() as client:
            resp = client.get(f"/users/{self.user_id}")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Brian', html)
            self.assertIn('Burrows', html)
            self.assertIn(BASE_IMG, html)
        pass
    def test_create_new_user(self):
        with app.test_client() as client:
            resp = client.post('/users/new', data={'fname':'Renee', 'lname':'Swischuk', 'user_image':BASE_IMG})

            self.assertEqual(resp.status_code, 302)
        pass
