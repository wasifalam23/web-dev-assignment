const express = require('express');
const personController = require('../controllers/personController');

const router = express.Router();

router
  .route('/')
  .get(personController.getAllPerson)
  .post(personController.createPerson);

router
  .route('/:id')
  .get(personController.getpersonById)
  .put(personController.updatePersonById)
  .delete(personController.deletePersonById);

module.exports = router;
