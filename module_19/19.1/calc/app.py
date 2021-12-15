# Put your app in here.
from flask import Flask, request 
import operations as op

app = Flask(__name__)

@app.route('/add')
def handle_add():
    a = float(request.args["a"])
    b = float(request.args['b'])
    return str(op.add(a,b))

@app.route('/sub')
def handle_sub():
    a = float(request.args["a"])
    b = float(request.args['b'])
    return str(op.sub(a,b))

@app.route('/mult')
def handle_mult():
    a = float(request.args["a"])
    b = float(request.args['b'])
    return str(op.mult(a,b))

@app.route('/div')
def handle_div():
    a = float(request.args["a"])
    b = float(request.args['b'])
    return str(op.div(a,b))

opers = {'add': op.add,
'sub': op.sub,
'mult': op.mult,
'div': op.div}

@app.route('/math/<name>')
def calc(name):
    a = float(request.args["a"])
    b = float(request.args['b'])
    return str(opers[name](a,b))
