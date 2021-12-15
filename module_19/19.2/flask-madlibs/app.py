from stories import Story
from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

options = {0:(['noun','verb','adjective'],"I bought a {noun} and it {verb} with an {adjective} inside."),
1:(['noun','verb','adjective'],"I owned a {noun} and it {verb} with an {adjective} inside."),
2:(['noun','verb','adjective'],"I caught a {noun} and it {verb} an {adjective} inside."),
3:(['noun','verb','adjective'],"I saw a {noun} and it {verb} an {adjective} inside."),
4:(['noun','verb','adjective'],"I had a {noun} and it {verb} with an {adjective} inside.")
}

app.config["SECRET_KEY"] = "thisIsASecretKey"
debug = DebugToolbarExtension(app)

story = Story(
    ["place", "noun", "verb", "adjective", "plural_noun"],
    """Once upon a time in a long-ago {place}, there lived a
       small {adjective} {noun}. It loved to {verb} {plural_noun}.""",
)

answers = ["forest", "dog", "sell", "orange and white", "drugs"]

globalOption = 0
@app.route("/", methods=["GET"])
def show_options():
    return render_template("/dropdown.html", optionIndex = options.keys(), optionText = [option[1] for option in options.values()])

@app.route("/form/<index>", methods=["GET"])
def show_form(index):
    globalOption = int(index)
    story_words = options[int(index)][0]
    story_text = options[int(index)][1]
    story = Story(story_words, story_text)
    return render_template("/form.html", story_text= story_text,parts_of_speech=story.prompts)


@app.route("/story")
def show_story():
    story_words = options[globalOption][0]
    story_text = options[globalOption][1]
    story = Story(story_words, story_text)

    answer = request.args
    story_text = story.generate(answer)
    return render_template("/story.html", story_text=story_text)
