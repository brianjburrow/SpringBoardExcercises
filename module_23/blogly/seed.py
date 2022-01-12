from models import db, connect_db, User, Post, Tag, PostTag
from app import app
from datetime import datetime

db.drop_all()
db.create_all()

users = [User(first_name = "Brian", last_name = "Burrows", img_url = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'),
 User(first_name = "Daisy", last_name = "Muffins", img_url = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'),
 User(first_name = "Renee", last_name = "Swischuk", img_url = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg')]

posts = [Post(title='First Post', content="First Content", user_id = 1, created_at=datetime.now()),
Post(title='Second Post', content="Second Content", user_id = 1, created_at=datetime.now()),
Post(title='Third Post', content="Third Content", user_id = 2, created_at=datetime.now())]



tags = [Tag(name="Outdoors"),
Tag(name='Indoors'),
Tag(name='Sunny'),
Tag(name="Rainy")]


db.session.add_all(users)
db.session.commit()
db.session.add_all(posts)
db.session.add_all(tags)
db.session.commit()

tag_posts = [PostTag(post_id = 1, tag_id = 1),
PostTag(post_id = 1, tag_id = 2),
PostTag(post_id = 1, tag_id = 3),
PostTag(post_id = 2, tag_id = 1)]

db.session.add_all(tag_posts)
db.session.commit()