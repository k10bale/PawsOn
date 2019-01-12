const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const MongoClient = require('mongodb').MongoClient;

// // Connection URL
// var url = 'mongodb://localhost:27017/project3';
// // Use connect method to connect to the Server
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected correctly to server");

//   db.close();
// });
// API Routes
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
