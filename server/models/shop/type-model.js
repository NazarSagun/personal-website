const { Schema, model } = require("mongoose");

const ProductTypeSchema = new Schema({
  type: { type: String, unique: true, required: true },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = model("Product_Type", ProductTypeSchema);
