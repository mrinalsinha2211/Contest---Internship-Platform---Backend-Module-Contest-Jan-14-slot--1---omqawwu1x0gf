const mongoose = require('mongoose');
const Notification = require('../models/Notification');

const internshipSchema = new mongoose.Schema({
  // studentId: MongoDB ObjectId referencing the student applying for the internship.
  // company: Name of the company providing the internship.
  // position: Internship position or role.
  // status: Current status of the internship (Pending, Approved, Rejected).
});

// Mongoose Hook for sending notifications on internship approval
internshipSchema.post('findOneAndUpdate', async function (doc, next) {
  try {
    // post('findOneAndUpdate'): Hook triggered after an internship is updated. It sends a notification when the internship status is changed to 'Approved'.
  } catch (error) {
    console.error('Error sending internship approval notification:', error);
    next(error);
  }
});

const Internship = mongoose.model('Internship', internshipSchema);

module.exports = Internship;
