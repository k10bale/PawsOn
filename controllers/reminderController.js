const express = require("express");
const db = require("../models");



//define methods for userController
module.exports = {

  findAll: function(req, res) {
    db.Reminder
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Reminder
      .findById(req.params.id)
      .populate('Reminders')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
   
  create : function(req, res) {
    console.log("the server received the post request!!!");
    console.log(req.body);
    const petid = req.params.petid;
    db.Reminder
      .create(req.body)
      .then(dbReminder => {
        console.log(dbReminder);
        //if appt is created successfully, find the user and and push the new appt's _id to the user's appointments array 
        return db.Pets.findOneAndUpdate({ _id: petid }, { $push : { reminders : dbReminder._id }}, { new : true });
        //res.json(dbAppt)
      })
      .then(dbPet => {
        //if the user is updated successfully, send it back to the client
        return res.json(dbPet)
      })
      .catch(err => res.status(422).json(err));
  },  
  get: function(req, res) {
    console.log("I am trying to get my appointments");
    const petId = req.param('petid');

    db.Pets.find({ _id : petId})
      .populate("reminders")
      .then(dbPetReminders => 
        //console.log(dbUserAppts)
        res.json(dbPetReminders)
      );
  },
  update: function (req, res) {
    const id = req.param('id');
    db.Reminder.findOne({ _id: id })
      .then(dbReminder => {
        if (dbReminder) {
          // update
          console.log('Updating appointment');
          dbReminder.reminderName = req.body.reminderName;
          dbReminder.date = req.body.date;
          dbReminder.notification = req.body.notification;
          dbReminder.reminderNumber = req.body.reminderNumber;
          dbReminder.notificationLabel = req.body.notificationLabel;
          dbReminder.save((err, dbReminder) => {
            if (err) console.error(err);
            res.json(dbReminder);
          });
        }
      });
  },
  remove: function (req, res) {
    const reminderId = req.param('id');
    db.Reminder.remove({ _id: reminderId })
      .then(dbReminder =>
        res.json(dbReminder)
      );
  }
};