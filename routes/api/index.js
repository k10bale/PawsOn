const router = require("express").Router();
const ownerRoutes = require("./owner");
const petRoutes = require("./pets");

// yarn routes
router.use("/owner", ownerRoutes);
router.use("/pets", petRoutes);


module.exports = router;
