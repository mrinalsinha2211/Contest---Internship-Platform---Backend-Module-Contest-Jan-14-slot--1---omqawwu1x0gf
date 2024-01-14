const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/student', studentController.createStudent);

module.exports = router;
