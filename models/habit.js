// models/habit.js
const mongoose = require('mongoose'); //import mongoose so we can create a schema and interact with mongodb


const habitSchema = new mongoose.Schema({
  // name of habit , water, reading, workout
  //required: used must enter something
  habitName: {
    type: String,
    required: true,
    trim: true //removes extra spacing before/after the habit name
  },

  //also required
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
//creates a habit colelction in mongodb 
//export the habit model so it can be used in route files