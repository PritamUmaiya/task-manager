from cs50 import SQL
from datetime import timedelta
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required


# Configure Application
app =  Flask(__name__)
app.config['SECRET_KEY'] = 'X7TS4-3FX35-N1AQW-J90RT-F67NP'

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = True
app.config["SESSION_TYPE"] = "filesystem"
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(days=7)  # Set session lifetime to 7 day
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///tasks.db")

@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/")
@login_required
def index():
    return render_template("index.html")



''' User Authentication '''

@app.route("/register", methods=["GET", "POST"])
def register():
    """Register the user"""

    if request.method == "POST":
        ...

    else:
        return render_template("register.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    """Login the user"""

    if request.method == "POST":
        ...
    
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Logout the user"""
    session.clear()
    flash("You have been logged out!", "info")
    return redirect("/login")


if __name__ == "__main__":
    app.run(debug=True)
