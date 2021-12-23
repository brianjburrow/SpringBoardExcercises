from boggle import Boggle
from flask import Flask, request, render_template, session, redirect, jsonify, Response

# Setup flask app
app = Flask(__name__)
app.config["SECRET_KEY"] = "SHHHHHHHHHHH SEEKRIT"

# Setup Boggle game on server side
boggle_game = Boggle()


def pack_boggle_board(unpacked_board):
    """Create a JSON serializable version of the board to store in session"""
    packed_board = {}
    for i, row in enumerate(unpacked_board):
        packed_board[f"row-{i}"] = row
    return packed_board


def unpack_boggle_board(packed_board):
    """Create a list of lists containing the board for passing to Boggle class methods"""
    unpacked_board = []
    for i in range(5):
        unpacked_board.append(packed_board[f"row-{i}"])
    return unpacked_board


@app.route("/")
def home_page():
    boggle_board = boggle_game.make_board()
    packed_board = pack_boggle_board(boggle_board)
    session["board"] = packed_board
    session["played_words"] = []
    session["valid_words"] = []
    if "num_plays" not in session:
        session["num_plays"] = 0
        session["high_score"] = 0
    return redirect("/game")


@app.route("/get_words", methods=["GET"])
def send_played_words():
    is_valid = request.args.get("valid")
    return {
        "data": {
            "valid_words": session["valid_words"],
            "played_words": session["played_words"],
            "is_valid": is_valid,
        }
    }


@app.route("/check_submission", methods=["POST"])
def handle_submission():
    # unpackage axios request
    packed_board = session["board"]
    if not packed_board:
        return redirect("/game")

    # pull out JSON from the axios request
    reqJson = request.get_json(
        force=True
    )  ## code taken from https://stackoverflow.com/questions/54892531/axios-data-coming-up-as-immutablemultidict-when-sent-to-flask-post-route-bu
    guess = reqJson["guess"].upper()

    # pull information stored in session
    pw = session["played_words"]
    vw = session["valid_words"]

    if guess not in pw:
        ## player hasn't already tried this word
        pw.append(guess)
        unpacked_board = unpack_boggle_board(packed_board)
        isValid = boggle_game.check_valid_word(unpacked_board, guess)
        if isValid == "ok":
            # player has found a new word
            vw.append(guess)
    else:
        isValid = "word-already-attempted"
    ## update stored session data
    session["valid_words"] = vw
    session["played_words"] = pw

    ## redirect to the API request which will respond with JSON
    return redirect(f"/get_words?valid={isValid}")


@app.route("/game", methods=["GET"])
def display_game():
    print("displaying_games")
    packed_board = session["board"]
    if not packed_board:
        print("redirecting")
        return redirect("/")
    print("redingering game_in_progress")
    return render_template("game_in_progress.html")


@app.route("/game_over", methods=["POST"])
def update_game_stats():

    session["num_plays"] = session["num_plays"] + 1
    # pull out JSON from the axios request
    reqJson = request.get_json(
        force=True
    )  ## code taken from https://stackoverflow.com/questions/54892531/axios-data-coming-up-as-immutablemultidict-when-sent-to-flask-post-route-bu
    current_score = int(reqJson["current_score"])
    print("in update game stats", current_score)
    print(type(current_score))
    if current_score > session["high_score"]:
        print("updating score")
        session["high_score"] = current_score
    print("ses_high", session["high_score"])
    return redirect("/game")
