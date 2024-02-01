#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Goal, Journal

def seed_goals():
    goals = []
    for goal in range(15):
        goal = Goal(
            title=fake.word(),
            description=fake.text(max_nb_chars=150),
            target_date=fake.date_between(start_date='-30d', end_date='+30d'),
            category=fake.random_element(elements=("Wellness", "Financial", "Relationships", "Career", "School", "Travel")),
            status=fake.random_element(elements=("Not yet started", "In progress", "Complete")),
            user=User,
            created_at=fake.date_between(start_date='-30d', end_date='today'),
            updated_at=fake.date_between(start_date='today', end_date='+30d')
        )
    return goals 

def seed_journalss():
    journals = []
    for journal in range(25):
        journal = Journal(
            date=fake.date_between(start_date='-30d', end_date='+30d'),
            journal_entry=fake.text(max_nb_chars=150),
            goal=Goal,
            created_at=fake.date_between(start_date='-30d', end_date='today'),
            updated_at=fake.date_between(start_date='today', end_date='+30d')
        )
    return goals 

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        # Clear out users before seeding
        User.query.delete()

        print("Seeding users...")
        user_a = User(name="Adam", email="adam@email.com")
        user_b = User(name="Britney", email="britney@email.com")
        user_c = User(name="Collin", email="collin@email.com")
        user_d = User(name="Dan", email="dan@email.com")
        user_e = User(name="Elsa", email="else@email.com")

        user_a.password_hash = "adam1"
        user_b.password_hash = "brit2"
        user_c.password_hash = "collin3"
        user_d.password_hash = "dan4"
        user_e.password_hash = "elsa5"

        all = [
            user_a, 
            user_b, 
            user_c, 
            user_d, 
            user_e
            ]

        db.session.add_all(all)
        db.session.commit()
        print("Done seeding users")


        # Clear out goals before seeding
        print("Clearing goals in db...")
        Goal.query.delete()

        print("Seeding goals...")
        goals = seed_goals()
        db.session.add_all(goals)
        db.session.commit()

        print("Done seeding goals.")

                      
