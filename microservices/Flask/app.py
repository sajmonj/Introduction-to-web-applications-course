from flask import Flask, request, jsonify, redirect, url_for, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import Mapped, mapped_column
from flask_marshmallow import Marshmallow

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///demo.sqlite"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)
ma = Marshmallow(app)


class Person(db.Model):
    id: Mapped[int] = mapped_column(db.Integer, primary_key=True)
    name: Mapped[str] = mapped_column(db.String)
    surname: Mapped[str] = mapped_column(db.String)
    job: Mapped[str] = mapped_column(db.String)


class PersonSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Person


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/person')
def get_people():
    people = db.session.execute(db.select(Person)).scalars()
    person_schema = PersonSchema(many=True)
    result = person_schema.dump(people)
    return jsonify(result)


@app.route('/person/<int:id>')
def person(id):
    person = db.session.query(Person).get_or_404(id)
    person_schema = PersonSchema()
    result = person_schema.dump(person)
    return jsonify(result)


@app.route('/create', methods=['GET'])
def show_create_form():
    return render_template('create_person.html')


@app.route('/create', methods=['POST'])
def create_person():
    name = request.form['name']
    surname = request.form['surname']
    job = request.form['job']
    new_person = Person(name=name, surname=surname, job=job)
    db.session.add(new_person)
    db.session.commit()

    return redirect(url_for('get_people'))


if __name__ == '__main__':
    app.run()


with app.app_context():
    db.drop_all()
    db.create_all()
    db.session.add(Person(name="ser", surname="serowy", job='it'))
    db.session.add(Person(name="mleko", surname="mleczne", job="farmer"))
    db.session.commit()
