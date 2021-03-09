from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Topic, db
from app.forms import NewTopicForm

topic_routes = Blueprint('topics', __name__)

      # name: topic,
      # description: description,
      # author_id: user,
      # author_nickname: nickname

@topic_routes.route('', methods=['POST'])
@login_required
def postTopic():
  form = NewTopicForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():

    topic = Topic(
      name=form.data['name'],
      description=form.data['description'],
      author_id=form.data['author_id'],
      author_nickname=form.data['author_nickname']
    )

    db.session.add(topic)
    db.session.commit()

    return topic.to_dict(current_user)

  return {"errors": "Error!"}, 400
