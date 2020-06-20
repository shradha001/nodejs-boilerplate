"use strict";

import mongoose from "mongoose";
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre("save", next => {
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
