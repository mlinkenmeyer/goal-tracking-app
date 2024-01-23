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

@app.route("/goals/<int:id>", methods=["GET"])
def get_goal(id):
    # ipdb.set_trace()  
    goal = db.session.get(Goal, id)

    if goal: 
        return make_response(goal.to_dict(), 200)
    return make_response({"error": "Goal not found"}, 404)

@app.route("/goals/<int:id>", methods=["PATCH"])
def update_goal(id):
    goal = db.session.get(Goal, id)

    if goal:
        goal_json = request.get_json()
        try:
            for key in goal_json:
                if hasattr(goal, key):
                    if key == 'target_date':
                        goal_json[key] = datetime.strptime(goal_json[key], '%Y-%m-%d').date()

                    setattr(goal, key, goal_json[key])
            print("Before Commit:", goal.to_dict())  
            db.session.commit()
            print("After Commit:", goal.to_dict())  
            return make_response(goal.to_dict(), 202)
        except ValueError as e:
            print("Error:", e)  
            return make_response({"errors": ["Validation errors"]}, 400)
    
    return make_response({"errors": ["Goal not found"]}, 404)


if __name__ == '__main__':
    app.run(port=5555, debug=True)

