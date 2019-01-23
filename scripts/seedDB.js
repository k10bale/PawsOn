const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/project3"
);


db.Owner
  .remove({})
  .then(() => db.Book.collection.insertMany(Owner))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  db.Pets
  .remove({})
  .then(() => db.Book.collection.insertMany(Pets))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
