from models import Pet, db, connect_db
from app import app

db.drop_all()
db.create_all()

pets = [Pet(name="Daisy", species='Cat',
            photo_url='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
            age=6, notes='Cool dog', available=False),
        Pet(name="Aspen", species='dog',
            photo_url='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
            age=8, notes='Awesome dog', available=False),
        Pet(name="Waveland", species='dog',
            age=8, notes='Party dog', available=False),
        Pet(name="Birdo", species='dog',
            age=0, notes='Fast dog', available=True),
        Pet(name="Whiskers", species='cat',
            age=0, notes='Couch cat', available=True)]

db.session.add_all(pets)
db.session.commit()
