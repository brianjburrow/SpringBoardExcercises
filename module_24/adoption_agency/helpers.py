from models import Pet
from models import db


def handle_new_pet_form_submission(form):
    name = form.name.data
    species = form.species.data
    photo_url = form.photo_url.data
    age = form.age.data
    notes = form.notes.data
    available = form.available.data
    pet = Pet(name=name,
              species=species,
              photo_url=photo_url,
              age=age,
              notes=notes,
              available=available)
    db.session.add(pet)
    db.commit()
    pass


def handle_edit_form_submission(form, pet):
    pet.name = form.name.data
    pet.species = form.species.data
    pet.photo_url = form.photo_url.data
    pet.age = form.age.data
    pet.notes = form.notes.data
    pet.available = form.available.data
    db.session.add(pet)
    db.session.commit()
    pass
