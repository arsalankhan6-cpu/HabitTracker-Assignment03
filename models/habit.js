// models/habit.js
const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  habitName: {
    type: String,
    required: true,
    trim: true
  },
  frequency: {
    type: String, // e.g. Daily, Weekly, Monthly
    required: true
  },
  streak: {
    type: Number,
    default: 0,
    min: 0
  },
  description: {
    type: String,
    default: ''
  },
  notes: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Habit', habitSchema);
