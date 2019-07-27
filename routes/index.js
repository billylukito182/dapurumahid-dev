const express = require('express');
const distance = require('google-distance');
const keys = require('../config/keys');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Exercise Expresses123' });
});

router.get('/api/current_user', (req, res) => {
  // res.send(req.user);
    res.render('welcome', { title: req.user.name });
  // res.send(req.session);
});

router.get('/api/logout', (req, res) => {
  req.logout();
  // res.send(req.user);
    res.render('test', { title: 'Logout success' });
});

module.exports = router;
