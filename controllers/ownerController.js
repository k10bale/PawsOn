const db = require("../models");

// Defining methods for the OwnersController
module.exports = {
  findAll: function(req, res) {
    db.Owner
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Owner
      .findById(req.params.id)
      .populate("pets")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  
  // findOne: function(req, res){
  //   db.Owner.findOne({_id: req.params.id })
  //     .populate('Pets', 'petName')
  //     .exec((err, pets) => {
  //       console.log("Populated Owner " + pets);
  //     })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },

  create: function(req, res) { 
    console.log("owner created" + req.body);
    db.Owner
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Owner
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .populate("Pets")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Owner
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
