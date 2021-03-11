from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

      # name: topic,
      # description: description,
      # author_id: user,
      # author_nickname: nickname

class NewTopicForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    author_id = IntegerField('author_id', validators=[DataRequired()])
    author_nickname = StringField('author_nickname', validators=[DataRequired()])
