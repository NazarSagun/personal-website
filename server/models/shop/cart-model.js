const { Schema, model } = require("mongoose");

const CartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  cartItems: [
    {
      name: String,
      price: String,
      amount: String
    }
  ],
  totalAmount: String
});

module.exports = model("Cart", CartSchema);