const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
  companyName: String,
  ownerName: String,
  rollNo: String,
  ownerEmail: String,
  accessCode: String,
});

const Register = mongoose.model('Register', registerSchema);

module.exports = Register;
