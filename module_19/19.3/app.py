from flask import Flask, request, render_template, redirect, flash
from surveys import surveys

app = Flask(__name__)
app.secret_key = 'asoethuasoeuhaoeush'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
responses = []


@app.route("/")
def show_homepage():
    survey = surveys["satisfaction"]
    title = survey.title
    instructions = survey.instructions
    return render_template("home.html", title=title, instructions=instructions)


@app.route("/questions/<index>")
def show_question_form(index):
    if request.args:
        responses.append(request.args['answer'])
    question_number = int(index)
    survey = surveys["satisfaction"]
    if (question_number > len(survey.questions) - 1) and (len(survey.questions) == len(responses)):
        # user has completed the survey
        responses.clear()
        return redirect('/thank-you')
    elif (question_number != len(responses)):
        # user has navigated away from the correct question without finishing the survey
        flash("You tried to access an invalid question url")
        return redirect(f'/questions/{len(responses)}')
    else:
        question = survey.questions[question_number]
        question_text = question.question
        choices = question.choices
        allow_text = question.allow_text
        return render_template(
            "/questions.html",
            question_number=index,
            question_text=question_text,
            choices=choices,
            allow_text = allow_text,
            next_index = question_number + 1
        )

@app.route("/thank-you")
def show_thank_you():
    return render_template('/thank-you.html')
