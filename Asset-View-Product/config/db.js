const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://vikashg802207:fsL1ZpRE8v6wWVSP@project.wrbptzb.mongodb.net/?retryWrites=true&w=majority&appName=project");
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit process on DB failure
  }
};


module.exports = connectDB;
