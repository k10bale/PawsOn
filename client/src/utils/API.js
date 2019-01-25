import axios from "axios";

export default {
  // Gets all books
  getOwner: function() {
    return axios.get("/api/owner");
  },
  getPets: function() {
    return axios.get("/api/pets");
  },
  // Gets the book with the given id
  getOwnerId: function(id) {
    return axios.get("/api/owner/" + id);
  },
  getPetsId: function(id) {
    return axios.get("/api/pets/" + id);
  },
  // Deletes the book with the given id
  deleteOwner: function(id) {
    return axios.delete("/api/owner/" + id);
  },
  deletePets: function(id) {
    return axios.delete("/api/pets/" + id);
  },
  // Saves a book to the database
  saveOwner: function(ownerData) {
    return axios.post("/api/owner", ownerData);
  },
  savePet: function(petData, id) {
    return axios.post("/api/pets/" + id, petData);
  }
};