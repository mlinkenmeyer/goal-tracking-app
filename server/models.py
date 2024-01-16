from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

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

    def __repr__(self):
        return f'<Goal {self.id} {self.title} {self.description} {self.target_date} \n 
        {self.category} {self.status} {self.created_at} {self.updated_at}'
    

# users = db.relationship('Goal', back_populates='user')
    
# journals = db.relationship()