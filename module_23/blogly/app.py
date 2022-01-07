from flask import Flask, redirect, request, render_template
from models import db, connect_db, User
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQALCHEMY_TRACK_MODIFICATIONS'] = False 
app.config['SQALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'secretkey'

debug = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def render_homepage():
    return redirect('/users')

@app.route('/users')
def render_users():
    users = User.query.all() ## get all users
    return render_template('users.html', users = users)

@app.route('/users/new', methods=['GET'])
def render_new_user():
    return render_template('new_user.html')

@app.route('/users/new', methods=['POST'])
def handle_new_user_submission():
    fname = request.form['fname']
    lname = request.form['lname']
    img_url = request.form['user_image']

    new_user = User(first_name = fname, last_name = lname, img_url = img_url)
    db.session.add(new_user)
    db.session.commit()
    return redirect('/users')

@app.route('/users/<user_id>')
def render_user(user_id):
    user = User.query.get(user_id)
    print(f'user {user_id}', user)
    return render_template('user.html', user_id = user_id, user = user)


@app.route('/users/<user_id>/edit', methods=['GET'])
def edit_form(user_id):
    user = User.query.get(user_id)
    return render_template('edit.html', user=user)

@app.route('/users/<user_id>/edit', methods=['POST'])
def handle_user_edit(user_id):
    user = User.query.get(user_id)
    if request.form['fname']:
        user.first_name = request.form['fname']
    if request.form['lname']:
        user.last_name = request.form['lname']
    if request.form['user_image']:
        user.img_url = request.form['user_image']
    db.session.add(user)
    db.session.commit()
    return redirect('/users')

@app.route('/users/<user_id>/delete', methods=['POST'])
def delete(user_id):
    User.query.filter(User.id == user_id).delete()
    db.session.commit()
    return redirect('/users')
