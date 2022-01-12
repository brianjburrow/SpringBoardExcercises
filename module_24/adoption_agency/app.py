from flask import Flask, request, render_template, redirect, flash
from forms import CreatePetForm
from models import db, connect_db, Pet
from helpers import handle_edit_form_submission, handle_new_pet_form_submission
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adoption_agency'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = ',s.thusnahoeu'

debug = DebugToolbarExtension(app)

connect_db(app)


@app.route('/')
def show_all_pets():
    pets = Pet.query.all()
    return render_template('home.html', pets=pets)


@app.route('/add', methods=['GET', 'POST'])
def add_pet():
    form = CreatePetForm()
    if form.validate_on_submit():
        handle_new_pet_form_submission(form)
        return redirect('/')
    else:
        return render_template("add_pet_form.html", form=form)


@app.route('/<pet_id>', methods=['GET', 'POST'])
def edit_pet(pet_id):
    pet = Pet.query.get_or_404(pet_id)
    form = CreatePetForm(obj=pet)

    if form.validate_on_submit():
        # update pet info
        handle_edit_form_submission(form, pet)
        return redirect('/')
    else:
        # show pet edit form with defaults to previous pet info
        return render_template("edit_pet_form.html", form=form, pet=pet)
