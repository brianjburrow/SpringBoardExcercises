from flask import Flask, request, redirect, render_template, flash, jsonify
from models import Cupcake, db, db_connect

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

db_connect(app)


@app.route('/')
def show_home():
    return render_template('home.html')


@app.route('/api/cupcakes', methods=['GET'])
def get_cupcakes():
    cupcakes = Cupcake.query.all()
    serializable_cupcakes = {'cupcakes': [
        cupcake.serialize() for cupcake in cupcakes]}
    return jsonify(serializable_cupcakes)


@app.route('/api/cupcakes', methods=['POST'])
def make_cupcake():
    flavor = request.json['flavor']
    size = request.json['size']
    rating = request.json['rating']
    image = request.json.get('image')

    cupcake = Cupcake(flavor=flavor, size=size,
                      rating=rating, image=image)
    db.session.add(cupcake)
    db.session.commit()
    return (jsonify({"cupcake": cupcake.serialize()}), 201)


@app.route('/api/cupcakes/<cupcake_id>', methods=['GET'])
def get_cupcake(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    return jsonify({"cupcake": cupcake.serialize()})


@app.route('/api/cupcakes/<cupcake_id>', methods=['DELETE'])
def delete_cupcake(cupcake_id):
    db.session.query(Cupcake).filter_by(id=cupcake_id).delete()
    db.session.commit()
    return jsonify({"message": f"Deleted cupcake with id : f{cupcake_id}"})


@app.route('/api/cupcakes/<cupcake_id>', methods=['PATCH'])
def update_cupcake(cupcake_id):
    request.json
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    cupcake.flavor = request.json.get('flavor', cupcake.flavor)
    cupcake.size = request.json.get('size', cupcake.size)
    cupcake.rating = request.json.get('rating', cupcake.rating)
    cupcake.image = request.json.get('image', cupcake.image)
    db.session.commit()
    return jsonify({"cupcake": cupcake.serialize()})

    
