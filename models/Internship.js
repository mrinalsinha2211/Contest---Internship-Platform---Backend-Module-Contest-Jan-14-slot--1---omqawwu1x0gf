// const mongoose = require('mongoose');
// const Notification = require('../models/Notification');

// const internshipSchema = new mongoose.Schema({
//   // studentId: MongoDB ObjectId referencing the student applying for the internship.
//   // company: Name of the company providing the internship.
//   // position: Internship position or role.
//   // status: Current status of the internship (Pending, Approved, Rejected).
// });

// // Mongoose Hook for sending notifications on internship approval
// internshipSchema.post('findOneAndUpdate', async function (doc, next) {
//   try {
//     // post('findOneAndUpdate'): Hook triggered after an internship is updated. It sends a notification when the internship status is changed to 'Approved'.
//   } catch (error) {
//     console.error('Error sending internship approval notification:', error);
//     next(error);
//   }
// });
const mongoose = require('mongoose');
const Notification = require('../models/Notification');

const internshipSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Assuming you have a 'Student' model
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
});

// Mongoose Hook for sending notifications on internship approval
internshipSchema.post('findOneAndUpdate', async function (doc, next) {
  try {
    const { status } = doc;

    // Check if the status is changed to 'Approved'
    if (status === 'Approved') {
      // Create a new Notification instance for internship approval
      const notification = new Notification({
        message: 'Your internship has been approved!',
        userId: doc.studentId, // Assuming you have a 'userId' field in Notification model
        type: 'internship_approval',
      });

      // Save the notification to the database
      await notification.save();
    }
    
    next();
  } catch (error) {
    console.error('Error sending internship approval notification:', error);
    next(error);
  }
});

const Internship = mongoose.model('Internship', internshipSchema);

module.exports = Internship;


// const Internship = mongoose.model('Internship', internshipSchema);

// module.exports = Internship;
