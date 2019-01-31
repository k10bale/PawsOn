const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

module.exports = {
  Owner: require("./owner"),
  Pets: require("./pets"),
  Reminder: require("./reminder"),
  userSession: require("./userSession")
};
