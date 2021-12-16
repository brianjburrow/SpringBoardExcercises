from flask import (
    Flask,
    request,
    render_template,
    redirect,
    flash,
    session,
    make_response,
)
from surveys import surveys

SESSION_KEY = "responses"
app = Flask(__name__)
app.secret_key = "asoethuasoeuhaoeush"
app.config["DEBUG_TB_INTERCEPT_REDIRECTS"] = False

survey = surveys["satisfaction"]


@app.route("/")
def show_homepage():
    survey = surveys["satisfaction"]
    title = survey.title
    instructions = survey.instructions
    return render_template("home.html", title=title, instructions=instructions)


@app.route("/start", methods=["POST"])
def start_survey():
    session[SESSION_KEY] = []
    return redirect("/questions/0")


@app.route("/answer", methods=["POST"])
def handle_answer():
    answer = request.form.get("answer")
    if answer:
        newList = session[SESSION_KEY]
        newList.append(answer)
        session[SESSION_KEY] = newList
    return redirect(f"/questions/{len(session[SESSION_KEY])}")


@app.route("/questions/<int:index>", methods=["GET"])
def show_question_form(index):
    question_num = int(index)
    n_responses = len(session[SESSION_KEY])
    print(n_responses, len(survey.questions))
    if n_responses == len(survey.questions):
        return redirect("/complete")
    if int(index) != n_responses:
        flash("Incorrect question url")
        return redirect(f"/questions/{len(session[SESSION_KEY])}")
    question = survey.questions[question_num]
    return render_template(
        "/questions.html",
        question_number=question_num,
        question_text=question.question,
        choices=question.choices,
        allow_text=question.allow_text,
    )


@app.route("/complete")
def show_thank_you():
    return render_template("/thank-you.html")
