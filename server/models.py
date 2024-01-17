from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from dateutil.parser import isoparse
import datetime

from config import db

# Models go here!

class Goal(db.Model, SerializerMixin):
    __tablename__ = 'goals'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    target_date = db.Column(db.Date)
    category = db.Column(db.String)
    status = db.Column(db.String)
    user_id = db.Column(db. Integer, db.ForeignKey('users.id'))
    journal_id = db.Column(db. Integer, db.ForeignKey('journals.id'))
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)

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
    

# users = db.relationship('Goal', back_populates='user')
    
# journals = db.relationship()