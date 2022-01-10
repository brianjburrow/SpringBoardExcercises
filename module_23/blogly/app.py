from flask import Flask, redirect, request, render_template
from flask.helpers import flash
from models import db, connect_db, User, Post
from flask_debugtoolbar import DebugToolbarExtension
from datetime import datetime

app = Flask(__name__)

app.config['SECRET_KEY'] = 'secretkey'

debug = DebugToolbarExtension(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQALCHEMY_TRACK_MODIFICATIONS'] = False 
app.config['SQLALCHEMY_ECHO'] = True
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
    print('did we make it here??')
    return redirect('/users')

@app.route('/users/<user_id>')
def render_user(user_id):
    user = User.query.get(user_id)
    posts = Post.query.filter_by(user_id = user_id).all()
    print(f'user {user_id}', user)
    return render_template('user.html', user_id = user_id, user = user, posts = posts)


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

@app.route('/users/<user_id>/posts/new')
def show_new_post_form(user_id):
    user = User.query.get(user_id)
    return render_template("new_post.html", user = user)

@app.route('/users/<user_id>/posts/new', methods=["POST"])
def handle_new_post_submission(user_id):
    title = request.form['post_title']
    content = request.form['post_content']
    if (not title) or (not content):
        flash('Must provide a title and content.')
        redirect(f'/users/{user_id}/posts/new')
    
    new_post = Post(title = title, 
    content = content, 
    created_at = datetime.now(),
    user_id = user_id)

    db.session.add(new_post)
    db.session.commit()
    return redirect(f'/users/{user_id}')

@app.route('/posts/<post_id>')
def show_post(post_id):
    post = Post.query.get(post_id)
    user = User.query.get(post.user_id)
    print('posts/', post, flush=True)
    return render_template('post.html', user = user, post = post)

@app.route('/posts/<post_id>/edit')
def show_post_edit_form(post_id):
    post = Post.query.get(post_id)
    user = User.query.get(post.user_id)
    return render_template('edit_post.html', user=user, post=post)

@app.route('/posts/<post_id>/edit', methods= ['POST'])
def handle_post_edit_submission(post_id):
    title = request.form['post_title']
    content = request.form['post_content']
    if not (title and content):
        flash("All entries are required.")
        return redirect(f'/posts/{post_id}/edit')
    post = Post.query.get(post_id)
    print("THIS IS A POST", post, flush=True)
    post.title = title
    post.content = content 
    db.session.add(post)
    db.session.commit()
    return redirect(f'/users/{post.user_id}')

@app.route('/posts/<post_id>/delete')
def handle_post_deletion(post_id):
    post = Post.query.get(post_id)
    user = User.query.get(post.user_id)
    Post.query.filter_by(id=post_id).delete()
    db.session.commit()
    return redirect(f'/users/{user.id}')

