const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String},
  email: { type: String },
  password: { type: String },
  confirmPassword: { type: String }
});

const Owner = mongoose.model("Owner", ownerSchema);

module.exports = Owner;
