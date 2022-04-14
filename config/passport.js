const passport = require("passport");
const { validPassword } = require("../lib/passwordUtils");
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

      const isValid = validPassword(password, user.hash, user.salt);

      if (isValid) {
        return callback(null, user);
      } else {
        return callback(null, false);
      }
    })
    .catch((err) => {
      callback(err);
    });
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, callback) => {
  callback(null, user.id);
});

passport.deserializeUser((userId, cb) => {
  User.findById(userId)
    .then((user) => {
      cb(null, user);
    })
    .catch((err) => {
      cb(err);
    });
});
