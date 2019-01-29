const router = require("express").Router();
const reminderController = require("../../reminderControllers/Controller");
const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// Matches with "/api/pets"
router.route("/")
  .get(reminderController.findAll)
  .post(reminderControllerr.create);

// Matches with "/api/pets/:id"
router
  .route("/:id")
  .get(reminderController.findById)
  .put(reminderController.update)
  .delete(reminderController.remove)
  .post(reminderController.create);

module.exports = router;
