const router = require("express").Router();
const reminderController = require("../../controllers/reminderController");
const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// Matches with "/api/reminder"
router.route("/")
  .get(reminderController.findAll)
  .post(reminderController.create);

// Matches with "/api/reminders/:id"
router
  .route("/:id")
  .get(reminderController.findById)
  .put(reminderController.update)
  .delete(reminderController.remove)
  .post(reminderController.create);

module.exports = router;
