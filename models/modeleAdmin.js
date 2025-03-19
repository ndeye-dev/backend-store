const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  motDePasse: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'superadmin'],  
    default: 'admin',  
  }
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
