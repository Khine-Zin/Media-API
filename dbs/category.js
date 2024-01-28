const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  create: { type: Date, default: Date.now },
});

const Category = mongoose.model("category", CategorySchema);
module.exports = Category;
