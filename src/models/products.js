"use strict";

import mongoose from "mongoose";
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
  }
});

ProductSchema.pre("save", next => {
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

const ProductModel = mongoose.model("products", ProductSchema);

export default ProductModel;
