const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petsSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  synopsis: String,
  date: { type: Date, default: Date.now }
});

const Pets = mongoose.model("Pets", petsSchema);

module.exports = Pets;
