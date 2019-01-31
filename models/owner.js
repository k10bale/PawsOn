const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const ownerSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String},
  email: { type: String },
  password: { type: String },
  confirmPassword: { type: String },
    pets: [{ type: Schema.Types.ObjectId, ref: "Pets"}]
});

ownerSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password);
};

ownerSchema.methods.validPassword = function(password, storedPW) {
  return bcrypt.compareSync(password, storedPW);
};

const Owner = mongoose.model("Owner", ownerSchema);

module.exports = Owner;
