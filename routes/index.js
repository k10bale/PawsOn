// new login code for INDEX
const path = require("path");
const router = require("express").Router();
const loginController = require("../controllers/loginController");
// const owner = require("./api/owner");
// const pets = require("./api/pets");
// const index = require("./api/index");
const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const apiRoutes = require("./api");

// API Routes
// Matches with "/api/signup"
router.use("/api", apiRoutes);

router
  .route("/api/signup")
  .post(loginController.signUp);


// Matches with "/api/signin"
router
  .route("/api/signin")
  .post(loginController.signIn);


// Matches with "/api/verify"
router
  .route("/api/verify")
  .post(loginController.verify);


// Matches with "/api/logout"
router
  .route("/api/logout")
  .post(loginController.logout);


// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


module.exports = router;
