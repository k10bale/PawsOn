const router = require("express").Router();
const petsController = require("../../controllers/petsController");

// Matches with "/api/books"
router.route("/")
  .get(petsController.findAll)
  .post(petsController.create);

// Matches with "/api/pets/:id"
router
  .route("/:id")
  .get(petsController.findById)
  .put(petsController.update)
  .delete(petsController.remove)
  .post(petsController.create);

module.exports = router;
