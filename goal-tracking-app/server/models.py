from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
import datetime
import re

from config import db, bcrypt

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    _password_hash_ = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

# Relationships
goals = db.relationship("Goals", back_populates="user", cascade="all")
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

@validates("_password_hash_")
def validate_password(self, key, password):
    pw_regex = re.compile(r'(?=.*[a-zA-Z])(?=.*[0-9])')
    if not password:
        raise ValueError("Password is required")
    if not 0 < len(password) <= 8:
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
    return f"User {self.name}, {self.email}"