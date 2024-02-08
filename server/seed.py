#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Goal, Journal

# Create users
user_a = User(name="Adam", email="adam@email.com")
user_b = User(name="Britney", email="britney@email.com")
user_c = User(name="Collin", email="collin@email.com")
user_d = User(name="Dan", email="dan@email.com")
user_e = User(name="Elsa", email="elsa@email.com")

user_a.password_hash = "adam1"
user_b.password_hash = "brit2"
user_c.password_hash = "collin3"
user_d.password_hash = "dan4"
user_e.password_hash = "elsa5"

all_users = [
    user_a, 
    user_b, 
    user_c, 
    user_d, 
    user_e
    ]

def seed_goals():
    goals = []
    for goal in range(15):
        goal = Goal(
            title=fake.word(),
            description=fake.text(max_nb_chars=150),
            target_date=fake.date_between(start_date='-30d', end_date='+30d'),
            category=fake.random_element(elements=("Wellness", "Financial", "Relationships", "Career", "School", "Travel")),
            status=fake.random_element(elements=("Not yet started", "In progress", "Complete")),
            user_id=rc(all_users).id,
            # created_at=fake.date_between(start_date='-30d', end_date='today'),
            # updated_at=fake.date_between(start_date='today', end_date='+30d')
        )
        goals.append(goal)
    return goals 

def seed_journals():
    journals = []
    for journal in range(25):
        journal = Journal(
            date=fake.date_between(start_date='-30d', end_date='+30d'),
            journal_entry=fake.text(max_nb_chars=150),
            goal_id=rc(goals).id,
            # created_at=fake.date_between(start_date='-30d', end_date='today'),
            # updated_at=fake.date_between(start_date='today', end_date='+30d')
        )
        journals.append(journal)
    return journals 

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        print("Clearing users in db...")
        User.query.delete()

        print("Seeding users...")
        db.session.add_all(all_users)
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

        # Clear out journals before seeding
        print("Clearing journals in db...")
        Journal.query.delete()

        print("Seeding journals...")
        journals = seed_journals()
        db.session.add_all(journals)
        db.session.commit()

        print("Done seeding journals.")

                      
