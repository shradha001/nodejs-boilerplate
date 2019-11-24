"use strict";
let User = require("./model");
const logger = require("../../libraries/logger");

const getUsers = async query => {
  try {
    let searchQuery = query ? query : {};
    const user = await User.find(searchQuery).exec();
    if (user && Array.isArray(user)) return user;
    else return [];
  } catch (e) {
    logger.error(`Service: Error in fetching users: ${JSON.stringify(e)}`);
    throw e;
  }
};

const addUser = async payload => {
  try {
    const user = new User();
    Object.assign(user, payload);
    await user.save();
  } catch (e) {
    logger.error(`Service: Error in adding users: ${JSON.stringify(e)}`);
    throw e;
  }
};

const updateUser = async payload => {
  try {
    await User.updateOne({ _id: payload._id }, { name: payload.name });
  } catch (e) {
    logger.error(`Service: Error in updating users: ${JSON.stringify(e)}`);
    throw e;
  }
};

const deleteUser = async _id => {
  try {
    await User.deleteOne({ _id });
  } catch (e) {
    logger.error(`Service: Error in deleting users: ${JSON.stringify(e)}`);
    throw e;
  }
};

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser
};
