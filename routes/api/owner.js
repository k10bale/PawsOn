const router = require("express").Router();
const ownerController = require("../../controllers/ownerController");
const loginController = require("../../controllers/loginController");
const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// Matches with "/api/owner"
router.route("/")
  .get(ownerController.findAll)
  .post(loginController.signUp);

  router.route("/login")
  // .get(ownerController.findAll)
  .post(loginController.signIn);
  // 
// Matches with "/api/owner/:id"
router
  .route("/:id")
  .get(ownerController.findById)
  .put(ownerController.update)
  .delete(ownerController.remove)
  .post(ownerController.create);

module.exports = router;
