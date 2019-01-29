const router = require("express").Router();
const ownerRoutes = require("./owner");
const petRoutes = require("./pets");
const reminderRoutes = require("./reminder");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// yarn routes
router.use("/owner", ownerRoutes);
router.use("/pets", petRoutes);
router.use("/reminder", reminderRoutes);
// do I need this?
// router.use("/userSession", userRoutes)



module.exports = router;
