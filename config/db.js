const mongoose = require('mongoose');

const URI = process.env.DB_URI;
//reads the mongodb string in .env file
// this keeps the sensitive credentials out of the source code and protects my password
console.log('DB_URI from .env =>', URI);  // local testing

mongoose // to connect to the mongoDB atlas cluster
  .connect(URI) //returns a promise, we atach .then and .cathc to handle connection/error
  .then(() => console.log('✅ Connected to MongoDB')) // if its conencted this shows a check mark in console
  .catch(err => console.error('❌ MongoDB connection error:', err.message)); // if connection fails this shows error message

module.exports = mongoose.connection;
