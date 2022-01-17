from flask import Flask, redirect, render_template, flash, jsonify, request, session
from helpers import handle_new_user_submission, handle_user_login, handle_new_feedback_submission, handle_feedback_update
from models import Feedback, User, db_connect, db
from forms import CreateUserForm, CreateFeedbackForm, LoginUserForm


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///feedback'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'aosetuhaotehu'

db_connect(app)

@app.route('/')
def show_home():
    return redirect('/register')

@app.route('/register', methods=['GET', 'POST'])
def handle_register():
    form = CreateUserForm()
    if form.validate_on_submit():
        user = handle_new_user_submission(form)
        if user:
            session['user_id'] = user.username
            db.session.add(user)
            db.session.commit()
            return redirect(f'/users/{user.username}')
        else:
            form.username.errors = ['Username or Email already exists']

    return render_template('register_form.html', form = form)

@app.route('/login', methods=['GET','POST'])
def handle_login():
    form = LoginUserForm()
    if form.validate_on_submit():
        user = handle_user_login(form)
        if user:
            session['user_id'] = user.username
            return redirect(f'/users/{user.username}')
        else:
            form.username.errors = ['Bad name/password']

    return render_template('login_form.html', form = form)

@app.route('/secret')
def show_secret():
    if "user_id" not in session:
        flash("You must be logged in to view this page")
        return redirect('/login')
    else:
        return render_template('secret.html')

@app.route('/logout')
def handle_logout():
    if "user_id" in session:
        session.pop("user_id")
    return redirect('/login')

@app.route('/users/<username>', methods=['GET'])
def show_user(username):
    user = User.query.get(username)
    if ("user_id" in session):
        feedbacks = Feedback.query.filter_by(username=username).all()
        return render_template('user.html', user = user, feedbacks = feedbacks)
    else:
        flash("You must be logged in to view user information.")
        return redirect('/login')


@app.route('/users/<username>/delete', methods=['POST'])
def delete_user(username):
    if ('user_id' not in session) and (session['user_id'] != username):
        flash("You must be logged in, and you can only delete your account")
        return redirect('/login')
    else:
        Feedback.query.filter_by(username=username).delete()
        db.session.commit()
        User.query.filter_by(username=username).delete()
        db.session.commit()
    return redirect('/register')

@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
def handle_add_feedback(username):
    if 'user_id' not in session:
        flash("You must be logged in to leave feedback.")
        return redirect('/login')
    form = CreateFeedbackForm()
    if form.validate_on_submit():
        feedback = handle_new_feedback_submission(form)
        if feedback:
            # created feedback successfully
            db.session.add(feedback)
            db.session.commit()
            return redirect(f'/users/{username}')
    return render_template('feedback_form.html', form = form)

@app.route('/feedback/<feedback_id>/update', methods=['GET', 'POST'])
def update_feedback(feedback_id):
    feedback = Feedback.query.get_or_404(feedback_id)
    form = CreateFeedbackForm()
    if form.validate_on_submit():
        feedback = handle_feedback_update(form, feedback)
        db.session.add(feedback)
        db.session.commit()
        return redirect(f'/users/{feedback.username}')
    form.title.data = feedback.title
    form.content.data = feedback.content
    form.username.data = feedback.username
    return render_template('edit_feedback_form.html', form = form, feedback = feedback)

@app.route('/feedback/<feedback_id>/delete', methods=['POST'])
def delete_feedback(feedback_id):
    if 'user_id' not in session:
        flash("User must be logged in to delete feedback.")
        return redirect('/login')
    feedback = Feedback.query.get_or_404(feedback_id)
    name = feedback.username
    Feedback.query.filter_by(id=feedback_id).delete()
    db.session.commit()
    return redirect(f"/users/{name}")