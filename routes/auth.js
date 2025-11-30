const express = require('express');
const passport = require('passport');
const router = express.Router();

//  Google Login - always show account picker
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account' // forces choose-account every time
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/habits');
  }
);

//  GitHub Login
router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email']
    // GitHub doesn't support "select_account" like Google.
    // Logout below clears our session for GitHub too.
  })
);

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/habits');
  }
);

// 🔹 Logout (works for BOTH Google & GitHub)
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);

    // destroy session so everything is fully reset
    req.session.destroy(() => {
      res.redirect('/');
    });
  });
});

module.exports = router;
