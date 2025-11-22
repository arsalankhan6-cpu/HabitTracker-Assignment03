const mongoose = require('mongoose');

const URI = process.env.DB_URI;
console.log('DB_URI from .env =>', URI);   // fine to leave during dev

mongoose
  .connect(URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

module.exports = mongoose.connection;
