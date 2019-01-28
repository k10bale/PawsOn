const mongoose = require('mongoose');
const moment = require('moment');
const Twilio = require('twilio');
// const config = require('../config');


const reminderSchema = new mongoose.Schema({
  reminderName: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required : true
  },
  reminderNumber: {
    type: String,
    required:true
  },
  notification: {
    type: Number,
    required: true
  },
  notificationLabel: {
    type: String,
    required: true
  }
}); 

reminderSchema.methods.requiresNotification = function(date) {
  return Math.round(moment.duration(moment(this.time).utc()
                          .diff(moment(date).utc())
                          ).asMinutes()) === this.notification;
};

reminderSchema.statics.sendNotifications = function(cb) {
  const searchDate = new Date();
  console.log('searchDate : ' + searchDate);
  Reminder
    .find()
    .then(function(reminders) {
      reminders = reminders.filter(function(reminder){
        return reminder.requiresNotification(searchDate);
      });
      if (reminders.length > 0) {
        console.log("I FOUND AN APPOINTMENT!!!");
        console.log(reminders);
        sendNotifications(reminders);
      } else {
        console.log("duration");
        console.log(Math.round(moment.duration(moment(this.time).utc()
                          .diff(moment(searchDate).utc())
                          ).asMinutes()));
      }
    });

    function sendNotifications(reminders) {


      const client = new Twilio(config.twilioAccountSid, config.twilioAuthToken);
      reminders.forEach(function(reminder) {
        const message = {
          to: `+1${reminder.reminderNumber}`,
          from: config.twilioPhoneNumber,
          body: `Hi! Just a quick reminder that ${reminder.reminderName} is coming up in ${reminder.notificationLabel}!`,
        };

        client.messages.create(message, function(err, res){
          if(err) {
            console.log(err);
          } else {
            let phoneNumber = reminder.reminderNumber;
            console.log(`Reminder sent to ${phoneNumber}`);
          }
        });
      });
      if(cb) {
        cb.call();
      }
    }
};

reminderSchema.statics.updateNotifications = () => {
  console.log("I am finding an expired appointment");
  Reminder
    //find the appts that are in the past
    .updateMany( { "time" : { $lte : new Date() }, "notification" : { $gt : 0 } }, { $set : { "notification" : 0} } )
    .then(dbReminder => console.log(dbReminder))
    .catch(err => console.log(err));
} 

const Reminder = mongoose.model("Reminder", reminderSchema);

module.exports = Reminder;
