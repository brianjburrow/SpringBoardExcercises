from flask import Flask, redirect, request, render_template

app = Flask(__name__)

@app.route('/')
def render_homepage():
    return render_template('base.html')