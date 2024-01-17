#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import Goal

# Views go here!

@app.route('/')
def index():
    return '<h1>Krystle and Madi\'s Project Server</h1>'

class Goals(Resource):
    def get(self):
        try:
            goals = [goal.to_dict() for goal in Goal.query.all()]
            return make_response(goals, 200)
        except Exception as e:
            return make_response({"error": str(e)}, 500)

api.add_resource(Goals, "/goals")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

