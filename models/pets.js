const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petsSchema = new Schema({
  petName: { type: String},
  image: { type: String},
  species: { type: String},
  birthday: { type: Date},
  owner: {type: mongoose.Schema.Types.ObjectId, ref: "Owner"},
  reminders:[ {type: mongoose.Schema.Types.ObjectId, ref: "Reminder"}]
});

const Pets = mongoose.model("Pets", petsSchema);

module.exports = Pets;
