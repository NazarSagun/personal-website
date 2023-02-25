const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  type: { type: String, required: true },
  name: { type: String, unique: true, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: false },
  images: [ {img: String} ],
  details: [
    {
      detail: String,
    },
  ],

  sizes: [
    {
      size: String,
    },
  ],
});

module.exports = model("Product", ProductSchema);