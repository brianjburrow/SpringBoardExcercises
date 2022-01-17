from models import User, db, Feedback

def handle_new_user_submission(form):
    username = str(form.username.data).capitalize()
    password = form.password.data
    if User.query.get(username):
        return False
    
    user = User.register(username, password)

    email = form.email.data
    first_name = str(form.first_name.data).capitalize()
    last_name = str(form.last_name.data).capitalize()
    
    user.first_name = first_name
    user.last_name = last_name
    user.email = email
    return user

def handle_new_feedback_submission(form):
    title = form.title.data
    content = form.content.data
    username = form.username.data
    try:
        new_feedback = Feedback(title = title, content = content, username = username)
        return new_feedback
    except:
        form.title.errors=['invalid feedback']
        return False

def handle_user_login(form):
    username=form.username.data
    password = form.password.data
    user = User.authenticate(username, password)
    return user

def handle_feedback_update(form, feedback):
    feedback.title = form.title.data
    feedback.content = form.content.data
    feedback.username = form.content.username
    return feedback