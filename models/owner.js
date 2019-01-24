const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const ownerSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String},
  email: { type: String },
  password: { type: String },
  isDeleted:  { type: Boolean, default: false },
    pets: [{ type: Schema.Types.ObjectId, ref: "Pets"}]
});

ownerSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};


ownerSchema.methods.validPassword = (password) => {
  return bcrypt.compareSync(password, this.password);
};

// Define hooks for pre-saving
ownerSchema.pre('save', function (next) {
  if (!this.password) {
      console.log('models/owner.js =======NO PASSWORD PROVIDED=======')
      next()
  } else {
      console.log('models/owner.js hashPassword in pre save');
      
      this.password = this.generateHash(this.password)
      next()
  }
})

const Owner = mongoose.model("Owner", ownerSchema);

module.exports = Owner;
