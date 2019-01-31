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
      .populate('Reminder')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
   
  // findOne: function(req, res){
  //   db.Owner.findOne({_id: req.params.id })
  //     .populate('Pets').exec((err, pets) => {
  //       console.log("Populated User " + pets);
  //     })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },

  create: function(req, res) {
    console.log("pet created" + req.body);
    db.Pets
      .create(req.body)
      .then((dbPet) => {
        console.log(req.params.id);
        console.log(dbPet);
        return(
        db.Owner.findOneAndUpdate({ _id: req.params.id }, {$push: { pets: dbPet._id }}, { new: true }))
        .populate('Pets', 'petName')
        .then((pets) => {
          console.log("Populated Owner " + pets);
        })
      })
     
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    
  },
  update: function(req, res) {
    db.Pets
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .populate("Reminder")
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
