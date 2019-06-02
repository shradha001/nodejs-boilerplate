"use strict";
let User = require("./model");

const getUserById = async _id => {
  try {
    const user = await User.find({ _id }).exec();
    if (user && Array.isArray(user)) return user[0];
    else return {};
  } catch (e) {
    throw e;
  }
};

const addUser = async payload => {
  try {
    const user = new User();
    Object.assign(user, payload);
    await user.save();
  } catch (e) {
    throw e;
  }
};

const updateUser = async payload => {
  try {
    await User.updateOne({ _id: payload._id }, { name: payload.name });
  } catch (e) {
    throw e;
  }
};

const deleteUser = async _id => {
  try {
    await User.deleteOne({ _id });
  } catch (e) {
    throw e;
  }
};

module.exports = {
  getUserById,
  addUser,
  updateUser,
  deleteUser
};
