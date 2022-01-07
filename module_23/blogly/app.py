from flask import Flask, redirect, request, render_template

app = Flask(__name__)

@app.route('/')
def render_homepage():
    return render_template('base.html')

@app.route('/users')
def render_users():
    return render_template('users.html')

@app.route('/users/new')
def render_new_user():
    return render_template('new_user.html')