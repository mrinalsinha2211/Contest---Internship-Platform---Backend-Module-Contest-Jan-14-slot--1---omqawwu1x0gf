const express = require('express');
const app = express();
const internshipRoutes = require('../routes/internshipRoutes');
const studentRoutes = require('../routes/studentRoutes');

app.use(express.json());

app.use('/api/v1/create', studentRoutes);
app.use('/api/v1/internship', internshipRoutes);

module.exports = app;
