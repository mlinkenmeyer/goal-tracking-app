#!/usr/bin/env python3

# Standard library imports
import datetime

# Remote library imports
from flask import request, make_response
from flask_restful import Resource
import ipdb
from datetime import datetime
from dateutil import parser

# Local imports
from config import app, db, api

# Add your model imports
from models import Goal, Journal, User

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

@app.route("/goals/<int:id>", methods=["DELETE"])
def delete_goal(id):
    goal = db.session.get(Goal, id)

    if goal: 
        db.session.delete(goal)
        db.session.commit()
    return make_response({"error": "Goal not found"}, 404)

@app.route("/journals", methods=["GET"])
def journals():
    journals = Journal.query.all()
    return make_response([j.to_dict() for j in journals], 200)

@app.route("/journals", methods=["POST"])
def create_journal():
    journal = Journal()
    journal_json = request.get_json()
    try:
        date_str = journal_json.get("date")
        if date_str:
            journal_json["date"] = datetime.strptime(date_str, "%Y-%m-%d")
        
        for key in journal_json:
            if hasattr(journal, key):
                setattr(journal, key, journal_json[key])
        db.session.add(journal)
        db.session.commit()
        return make_response(journal.to_dict(), 201)
    except ValueError as e:
        return make_response({"error": e.__str__()}, 422) 
class Users(Resource):
    
    def get(self):
        try:
            users = [user.to_dict() for user in User.query.all()]
            return make_response(
                users, 200
            )
        except Exception as e:
            return make_response(
                {"error": str(e)}, 500
            )
    
    def post(self):
        try:
            name = request.get_json()["name"]
            email = request.get_json()["email"]
            password = request.get_json()["password"]
            new_user = User(
                name = name,
                email = email
            )
            new_user.password_hash = password
            db.session.add(new_user)
            db.session.commit()
            return make_response(
                new_user.to_dict(), 201
            )
        except Exception as e:
            return make_response(
                {"error": str(e)}, 500
            )

api.add_resource(Users, "/users")

class UserById(Resource):

    def get(self, id):
        try:
            user = User.query.filter_by(id=id).first()
            return make_response(
                user.to_dict(), 200
            )
        except:
            return make_response(
                {"error": "User ID does not exist"}
            )
    
    def patch(self, id):
        try:
            user = User.query.filter_by(id=id).first()
            data = request.get_json()
            for key in data:
                setattr(user, key, data[key])
            if data.get("password"):
                user.password_hash = request.get_json()["password"]
            db.session.commit()
            return make_response(
                user.to_dict(), 203
            )
        except Exception as e:
            return make_response(
                {"error": str(e)}, 500
            )

    def delete(self, id):
        try:
            user = User.query.filter_by(id=id).first()
            db.session.delete(user)
            db.session.commit()
            return make_response(
                {}, 204
            )
        except:
            return make_response(
                {"error": "User ID does not exist"}
            )
        
api.add_resource(UserById, "/users/<int:id>")

class JournalById(Resource):

    def get(self, id):
        try:
            journal = Journal.query.filter_by(id=id).first()
            return make_response(
                journal.to_dict(), 200
            )
        except:
            return make_response(
                {"error": "Journal ID does not exist"}
            )
    
    def patch(self, id):
        try:
            journal = Journal.query.filter_by(id=id).first()

            data = request.get_json()
            for attr in data:
                setattr(journal, attr, data.get(attr))
                # setattr(journal, "updated_at", datetime.datetime.utcnow)
                db.session.commit()
                return make_response(
                    {"message": f"Journal {journal.id} has been updated"}, 203
                )
        except Exception as e:
            return make_response(
                {"error": str(e)}, 500
            )

    def delete(self, id):
        try:
            journal = Journal.query.filter_by(id=id).first()
            db.session.delete(journal)
            db.session.commit()
            return make_response(
                {"message": f"Journal {journal.id} has been deleted"}, 204
            )
        except:
            return make_response(
                {"error": "Journal ID does not exist"}
            )
        
api.add_resource(JournalById, "/journals/<int:id>")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

