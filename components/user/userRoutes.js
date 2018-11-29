'use strict';

const { celebrate, Joi, isCelebrate } = require('celebrate');
const { respCodeAndMsg } = require('../../config');
const { STATUS_CODE } = respCodeAndMsg;
const { createErrorObject } = require('../../utilities');
const userController = require('./userController');

const getUser = {
  path: '/users',
  validation: {
    query: Joi.object().keys({
      _id: Joi.string().required()
    })
  }
};

const addUser = {
  path: '/users',
  validation: {
    body: Joi.object().keys({
      name: Joi.string().required()
    })
  }
};

const updateUser = {
  path: '/users',
  validation: {
    body: Joi.object().keys({
      _id: Joi.string().required(),
      name: Joi.string().required()
    })
  }
};

const deleteUser = {
  path: '/users',
  validation: {
    query: Joi.object().keys({
      _id: Joi.string().required()
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
        const payload = req.body;
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
