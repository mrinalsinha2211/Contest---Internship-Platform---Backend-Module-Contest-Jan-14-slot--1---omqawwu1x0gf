const Internship = require('../models/Internship');
const Student = require('../models/Student');

exports.applyForInternship = async (req, res) => {
  try {
    // TODO: Extract necessary details from the request body (studentId, position, company)
    // TODO: Check if the student with the given studentId exists
    // TODO: Create a new Internship instance with the provided details and 'Pending' status
    // TODO: Save the new Internship instance to the database
    // TODO: Respond with a success message and the created internship
     try {
     const { studentId, position, company } = req.body;

 
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

   const internship = new Internship({
      studentId,
      position,
      company,
      status: 'Pending',
    });
  await internship.save();
    res.status(201).json({
      message: 'Internship application submitted successfully',
      internship,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.approveInternship = async (req, res) => {
  try {
    // Extract the internshipId from the request parameters
    const { internshipId } = req.params;

    // Update the status of the internship with the given internshipId to 'Approved'
    const updatedInternship = await Internship.findByIdAndUpdate(
      internshipId,
      { $set: { status: 'Approved' } },
      { new: true } // to get the updated document
    );

    // Check if the internship was found and updated successfully
    if (!updatedInternship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    // Respond with a success message and the updated internship
    res.status(200).json({
      message: 'Internship approved successfully',
      internship: updatedInternship,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
