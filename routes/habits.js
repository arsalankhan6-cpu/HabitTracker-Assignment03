// routes/habits.js
const express = require('express');
const router = express.Router();
const Habit = require('../models/habit');

// --------- LIST HABITS (READ) -------------
// GET /habits
router.get('/', async (req, res, next) => {
  try {
    const habits = await Habit.find().sort({ createdAt: -1 });
    res.render('habit_list', {
      title: 'My Habits',
      habits
    });
  } catch (err) {
    next(err);
  }
});

// --------- SHOW ADD FORM (CREATE - GET) -----
// GET /habits/add
router.get('/add', (req, res) => {
  res.render('habit_add', {
    title: 'Add Habit'
  });
});

// --------- HANDLE ADD FORM (CREATE - POST) ---
// POST /habits/add
router.post('/add', async (req, res, next) => {
  try {
    const { habitName, frequency, streak, description, notes } = req.body;

    // basic validation
    if (!habitName || !frequency) {
      throw new Error('Habit name and frequency are required.');
    }

    const habit = new Habit({
      habitName,
      frequency,
      streak: Number(streak) || 0,
      description,
      notes
    });

    await habit.save();
    res.redirect('/habits');
  } catch (err) {
    next(err);
  }
});

// --------- SHOW EDIT FORM (UPDATE - GET) -----
// GET /habits/edit/:id
router.get('/edit/:id', async (req, res, next) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      const error = new Error('Habit not found');
      error.status = 404;
      throw error;
    }

    res.render('habit_edit', {
      title: 'Edit Habit',
      habit
    });
  } catch (err) {
    next(err);
  }
});

// --------- HANDLE EDIT FORM (UPDATE - POST) ---
// POST /habits/edit/:id
router.post('/edit/:id', async (req, res, next) => {
  try {
    const { habitName, frequency, streak, description, notes } = req.body;

    await Habit.findByIdAndUpdate(
      req.params.id,
      {
        habitName,
        frequency,
        streak: Number(streak) || 0,
        description,
        notes
      },
      { runValidators: true }
    );

    res.redirect('/habits');
  } catch (err) {
    next(err);
  }
});

// --------- SHOW DELETE CONFIRM (DELETE - GET) ---
// GET /habits/delete/:id
router.get('/delete/:id', async (req, res, next) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      const error = new Error('Habit not found');
      error.status = 404;
      throw error;
    }

    res.render('habit_delete', {
      title: 'Delete Habit',
      habit
    });
  } catch (err) {
    next(err);
  }
});

// --------- HANDLE DELETE (DELETE - POST) -------
// POST /habits/delete/:id
router.post('/delete/:id', async (req, res, next) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.redirect('/habits');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
