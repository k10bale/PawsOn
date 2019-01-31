import axios from "axios";

export default {
  // Gets all 
  getOwner: function() {
    return axios.get("/api/owner");
  },
  getOwnerAuth: function(query) {
    return axios.post("/api/owner/login", query);
  },
  getPets: function() {
    return axios.get("/api/pets");
  },
  getReminder: function() {
    return axios.get("/api/reminders");
  },
  // Gets the book with the given id
  getOwnerId: function(id) {
    return axios.get("/api/owner/" + id);
  },
  getPetsId: function(id) {
    return axios.get("/api/pets/" + id);
  },
  getReminderId: function(id) {
    return axios.get("/api/reminders/" + id);
  },
  // Deletes the book with the given id
  deleteOwner: function(id) {
    return axios.delete("/api/owner/" + id);
  },
  deletePets: function(id) {
    return axios.delete("/api/pets/" + id);
  },
  deleteReminder: function(id) {
    return axios.delete("/api/reminders/" + id);
  },
  // Saves a book to the database
  saveOwner: function(ownerData) {
    return axios.post("/api/owner/", ownerData);
  },
  savePet: function(petData, id) {
    return axios.post("/api/pets/" + id, petData);
  },
  saveReminder: function(reminderData, id) {
    return axios.post("/api/reminders/" + id, reminderData);
  }
};
