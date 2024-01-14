const express = require('express');
const router = express.Router();
const internshipController = require('../controllers/internshipController');

router.post('/apply', internshipController.applyForInternship);
router.put('/approve/:internshipId', internshipController.approveInternship);

module.exports = router;
