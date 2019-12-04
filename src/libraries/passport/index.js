"use strict";

const LocalStrategy = require("passport-local").Strategy;

const services = require("../../services");
const utilities = require("../../utilities");

const hashUtil = utilities.hashUtil;
const userService = services.users;

const loginConfig = passport => {
  passport.serializeUser(function(user, done) {
    done(null, user.email);
  });

  const localStrategy = new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      try {
        const user = await userService.getUserByEmail(email);

        if (!user) {
          return done(null, false);
        }

        const isValidPassword = await hashUtil.compareHash(
          password,
          user.password
        );

        if (!isValidPassword) {
          return done(null, false);
        }

        return done(null, user);
      } catch (e) {
        return done(e);
      }
    }
  );

  passport.use("local", localStrategy);
};

module.exports = loginConfig;
