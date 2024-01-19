#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource
import ipdb
from datetime import datetime
from dateutil import parser

# Local imports
from config import app, db, api

# Add your model imports
from models import Goal

# Views go here!

@app.route('/')
def index():
    return '<h1>Krystle and Madi\'s Project Server</h1>'

@app.route("/goals", methods=["GET"])
def goals():
    goals = Goal.query.all()
    return make_response([g.to_dict() for g in goals], 200)

@app.route("/goals", methods=["POST"])
def create_goal():
    goal = Goal()
    goal_json = request.get_json()
    target_date_str = goal_json["target_date"].replace("Z", "")
    target_date = parser.isoparse(target_date_str)
    goal_json["target_date"] = target_date
    try:
        for key in goal_json:
            if hasattr(goal, key):
                setattr(goal, key, goal_json[key])
        db.session.add(goal)
        db.session.commit()
        return make_response(goal.to_dict(), 201)
    except ValueError as e:
        return make_response({"error": e.__str__()}, 422) 


# class Goals(Resource):
#     def get(self):
#         try:
#             goals = [goal.to_dict() for goal in Goal.query.all()]
#             return make_response(goals, 200)
#         except Exception as e:
#             return make_response({"error": str(e)}, 500)

# api.add_resource(Goals, "/goals")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

