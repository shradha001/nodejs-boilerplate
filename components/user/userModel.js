"use strict";

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
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

module.exports = mongoose.model("user", UserSchema);
