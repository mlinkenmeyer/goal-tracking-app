#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import Goal, User

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
                {"message": "New user added"}, 201
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
            for attr in data:
                setattr(user, attr, data.get(attr))
                db.session.commit()
                return make_response(
                    {"message": f"User {user.id} has been updated"}, 203
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
                {"message": f"User {user.id} has been deleted"}, 204
            )
        except:
            return make_response(
                {"error": "User ID does not exist"}
            )
        
api.add_resource(UserById, "/users/<int:id>")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

