const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String},
  email: { type: String },
  password: { type: String },
  confirmPassword: { type: String },
    pets: [{ type: Schema.Types.ObjectId, ref: "Pets"}, { type: Schema.Types.petName, ref: "Pets"}]
});

// ownerSchema.methods.generateHash = function(password) {
//   return bcrypt.hashSync(password, bcrypt.gensaltSync(8), null);
// };

// ownerSchema.methods.validPassword = function(password) {
//   return bcrypt.compareSync(password, this.password);
// };

const Owner = mongoose.model("Owner", ownerSchema);

module.exports = Owner;
