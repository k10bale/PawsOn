const db = require("../models");

// Defining methods for the PetssController
module.exports = {
  findAll: function(req, res) {
    db.Pets
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Pets
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log("pet created" + req.body);
    db.Pets
      .create(req.body)
      .then((dbPet) => {
        console.log(req.params.id);
        console.log(dbPet);
        return(
        db.Owner.findOneAndUpdate({ _id: req.params.id }, {$push: { pets: dbPet._id }}, { new: true }))
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    
  },
  update: function(req, res) {
    db.Pets
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Pets
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
