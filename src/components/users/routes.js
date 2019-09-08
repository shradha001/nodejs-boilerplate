"use strict";

const { celebrate, Joi } = require("celebrate");
const { createErrorObject } = require("../../utilities");
const userController = require("./controller");

const getUser = {
  path: "/api/v1/users",
  validation: {
    query: Joi.object().keys({
      _id: Joi.string()
        .trim()
        .optional()
    })
  }
};

const addUser = {
  path: "/api/v1/users",
  validation: {
    body: Joi.object().keys({
      name: Joi.string()
        .trim()
        .required()
    })
  }
};

const updateUser = {
  path: "/api/v1/users",
  validation: {
    query: Joi.object().keys({
      _id: Joi.string()
        .trim()
        .required()
    }),
    body: Joi.object().keys({
      name: Joi.string()
        .trim()
        .required()
    })
  }
};

const deleteUser = {
  path: "/api/v1/users",
  validation: {
    query: Joi.object().keys({
      _id: Joi.string()
        .trim()
        .required()
    })
  }
};

module.exports = app => {
  app.get(getUser.path, celebrate(getUser.validation), async (req, res) => {
    try {
      const payload = req.query;
      const successResponse = await userController.getUser(payload);
      res.status(successResponse.httpStatusCode).json(successResponse.details);
    } catch (e) {
      let error = e;
      if (!e.details) error = createErrorObject();
      res.status(error.httpStatusCode).json(error.details);
    }
  });

  app.post(addUser.path, celebrate(addUser.validation), async (req, res) => {
    try {
      const payload = req.body;
      const successResponse = await userController.addUser(payload);
      res.status(successResponse.httpStatusCode).json(successResponse.details);
    } catch (e) {
      let error = e;
      if (!e.details) error = createErrorObject();
      res.status(error.httpStatusCode).json(error.details);
    }
  });

  app.put(
    updateUser.path,
    celebrate(updateUser.validation),
    async (req, res) => {
      try {
        let payload = req.body;
        const queryParams = req.query;
        payload = { ...payload, ...queryParams };
        const successResponse = await userController.updateUser(payload);
        res
          .status(successResponse.httpStatusCode)
          .json(successResponse.details);
      } catch (e) {
        let error = e;
        if (!e.details) error = createErrorObject();
        res.status(error.httpStatusCode).json(error.details);
      }
    }
  );

  app.delete(
    deleteUser.path,
    celebrate(deleteUser.validation),
    async (req, res) => {
      try {
        const payload = req.query;
        const successResponse = await userController.deleteUser(payload);
        res
          .status(successResponse.httpStatusCode)
          .json(successResponse.details);
      } catch (e) {
        let error = e;
        if (!e.details) error = createErrorObject();
        res.status(error.httpStatusCode).json(error.details);
      }
    }
  );
};
