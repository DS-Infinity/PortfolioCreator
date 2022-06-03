const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (err) {
    console.error('Could not connect to MongoDB', err);
    process.exit(1);
  }
};

module.exports = connectDB;
