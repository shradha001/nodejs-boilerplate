"use strict";

const { celebrate, Joi } = require("celebrate");
const passport = require("passport");

const utilities = require("../utilities");
const controllers = require("../controllers");
const logger = require("../libraries/logger");

const { createErrorObject } = utilities.utils;
const userController = controllers.users;

const register = {
  path: "/api/v1/users/register",
  validation: {
    body: Joi.object().keys({
      email: Joi.string()
        .email()
        .trim()
        .required(),
      password: Joi.string()
        .trim()
        .required()
    })
  }
};

const login = {
  path: "/api/v1/users/login",
  validation: {
    body: Joi.object().keys({
      email: Joi.string()
        .email()
        .trim()
        .required(),
      password: Joi.string()
        .trim()
        .required()
    })
  }
};

module.exports = app => {
  app.post(register.path, celebrate(register.validation), async (req, res) => {
    try {
      const payload = req.body;
      const successResponse = await userController.registerUser(payload);
      res.status(successResponse.httpStatusCode).json(successResponse.details);
    } catch (e) {
      logger.error(`Error in registration of user: ${e}`);
      let error = e;
      if (!e.details) error = createErrorObject();
      res.status(error.httpStatusCode).json(error.details);
    }
  });

  app.post(
    login.path,
    celebrate(login.validation),
    passport.authenticate("local"),
    async (req, res) => {
      try {
        const payload = req.user;
        const successResponse = await userController.loginUser(payload);
        res
          .status(successResponse.httpStatusCode)
          .json(successResponse.details);
      } catch (e) {
        logger.error(`Error in user login: ${e}`);
        let error = e;
        if (!e.details) error = createErrorObject();
        res.status(error.httpStatusCode).json(error.details);
      }
    }
  );
};
