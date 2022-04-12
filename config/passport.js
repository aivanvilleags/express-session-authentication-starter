const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("./database");
const User = connection.models.User;

const customFIelds = {
  usernameField: "uname",
  passwordField: "pw",
};

const verifyCallback = (username, password, callback) => {
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return callback(null, false);
      }
    })
    .catch((err) => {
      callback(err);
    });
};

const strategy = new LocalStrategy();

passport.use();
