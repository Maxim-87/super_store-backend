import mongoose from "mongoose";

const Product = new mongoose.Schema({
  image: { type: Array },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String },
});

export default mongoose.model("Product", Product);
