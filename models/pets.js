const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petsSchema = new Schema({
  petName: { type: String},
  image: { type: String},
  species: { type: String},
  birthday: { type: Date}
});

const Pets = mongoose.model("Pets", petsSchema);

module.exports = Pets;
