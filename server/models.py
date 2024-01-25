from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from dateutil.parser import isoparse
from sqlalchemy.sql import func
import datetime
import re

from config import db, bcrypt

# Models go here!

class Goal(db.Model, SerializerMixin):
    __tablename__ = 'goals'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    target_date = db.Column(db.Date)
    category = db.Column(db.String)
    status = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)

    # Relationships
    user = db.relationship("User", back_populates="goals")
    journals = db.relationship("Journal", back_populates="goal", cascade="all")

    @validates("title")
    def validate_title(self, key, title):
        if not title:
            raise ValueError("Title is required.")
        if len(title) > 50:
            raise ValueError("Title must be 50 characters or less")
        return title
    
    @validates("description")
    def validate_description(self, key, description):
        if not description:
            raise ValueError("Description required")
        if not isinstance(description, str):
            raise ValueError("Description must be a string")
        if len(description) > 150:
            raise ValueError("Description must be 100 or fewer characters")
        return description
    
    # @validates("target_date")
    # def validate_target_date(self, key, target_date):
    #     try:
    #         target_date = isoparse(target_date)
    #         return target_date
    #     except (TypeError, ValueError):
    #         raise ValueError("Invalid ISO 8601 datetime format")

    @validates("category")
    def validate_category(self, key, category):
        valid_types = ["Wellness", "Financial", "Relationships", "Career", "School", "Travel"]
        if not category:
            raise ValueError("Category type is required")
        if category not in valid_types:
            raise ValueError("Invalid Category")
        return category
    
    @validates("status")
    def validate_category(self, key, status):
        valid_types = ["Not yet started", "In progress", "Complete"]
        if not status:
            raise ValueError("Status type is required")
        if status not in valid_types:
            raise ValueError("Invalid Status")
        return status
    
    @validates("created_at")
    def validate(created_at):
        try:
            datetime.date.fromisoformat(created_at)
        except ValueError:
            raise ValueError("Incorrect date format, should be YYYY-MM-DD")
        
    @validates("updated_at")
    def validate(updated_at):
        try:
            datetime.date.fromisoformat(updated_at)
        except ValueError:
            raise ValueError("Incorrect date format, should be YYYY-MM-DD")

    def __repr__(self):
        return f'<Goal {self.id} {self.title} {self.description} {self.target_date} {self.category} {self.status} {self.created_at} {self.updated_at}'
    
class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=func.current_timestamp())

    # Relationships
    goals = db.relationship("Goal", back_populates="user", cascade="all")
    journals = association_proxy("goals", "journals")

    # Validations
    @validates("name")
    def validate_name(self, key, name):
        if not name:
            raise ValueError("Name is required")
        if not 1 <= len(name) <= 15:
            raise ValueError("Name must be 15 characters or less")
        return name

    @validates("email")
    def validate_email(self, key, email):
        if not email:
            raise ValueError("Email is required")
        email_regex = r"^\S+@\S+\.\S+$"
        if not re.match(email_regex, email):
            raise ValueError("Invalid email")
        return email

    @validates("_password_hash")
    def validate_password(self, key, password):
        pw_regex = re.compile(r'(?=.*[a-zA-Z])(?=.*[0-9])')
        if not password:
            raise ValueError("Password is required")
        # elif not pw_regex.search(password):
        #     raise ValueError("Password must contain alpha and numeric characters")
        elif len(password) <= 8:
            raise ValueError("Password must be 8 characters or less")
        return password

    @hybrid_property
    def password_hash(self):
        raise Exception("Password hashes may not be viewed.")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )

    def __repr__(self):
        return f"<User: {self.name} ({self.email})>"

class Journal(db.Model, SerializerMixin):
    __tablename__ = "journals"

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime)
    journal_entry = db.Column(db.String)
    goal_id = db.Column(db.Integer, db.ForeignKey("goals.id"))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # Relationships
    goal = db.relationship("Goal", back_populates="journals")
    user = association_proxy("goal", "user")

    @validates("journal_entry")
    def validate_description(self, key, journal_entry):
        if not journal_entry:
            raise ValueError("Journal entry is required to create a journal entry")
        elif not 0 <= len(journal_entry) <= 200:
            raise ValueError("Journal entry has reached max characters")
        return journal_entry

    def __repr__(self):
        return f"Goal: {self.goal_id}, {self.date}: {self.journal_entry}"

