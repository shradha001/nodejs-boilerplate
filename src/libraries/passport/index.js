"use strict";

import {
  Strategy as JWTstrategy,
  ExtractJwt as ExtractJWT
} from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";

import { users as userService } from "../../services";
import { hashUtil } from "../../utilities";
import { constants } from "../../config";

const authStrategiesConfig = passport => {
  passport.serializeUser(function(user, done) {
    done(null, user.email);
  });

  passport.deserializeUser(function(email, done) {
    userService
      .getUserByEmail(email)
      .then(user => {
        done(null, user);
      })
      .catch(e => {
        done(e);
      });
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

  const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: constants.JWT.secret
  };

  passport.use(
    "jwt",
    new JWTstrategy(options, (jwtPayload, done) => {
      userService
        .getUserByEmail(jwtPayload.email)
        .then(user => {
          done(null, user);
        })
        .catch(e => {
          done(e);
        });
    })
  );
};

export default authStrategiesConfig;
