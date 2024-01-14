const Student = require('../models/Student');

exports.createStudent = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    // Check if the email is already in use
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    // Create a new student
    const student = new Student({ firstName, lastName, email });
    await student.save();

    res.status(201).json({
      message: 'Student created successfully',
      student,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
