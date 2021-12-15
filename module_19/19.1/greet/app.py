from flask import Flask, request 

app = Flask(__name__)

@app.route('/welcome')
def welcome_user():
    '''Return a simple string: welcome'''
    return 'welcome'

@app.route('/welcome/home')
def welcome_user_home():
    '''Returns a simple string: welcome home'''
    return "welcome home"

@app.route('/welcome/back')
def welcome_user_back():
    '''returns a simple string: welcome back'''
    return "welcome back"