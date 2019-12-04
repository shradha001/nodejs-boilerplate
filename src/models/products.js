"use strict";

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ProductSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  productCode: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
});

ProductSchema.pre("save", next => {
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model("products", ProductSchema);
