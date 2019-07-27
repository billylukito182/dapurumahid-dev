const express = require('express');
const distance = require('google-distance');
const keys = require('../config/keys');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("google distance")
  distance.apiKey = keys.googleKey;
  distance.get(
      {
        origin: 'APL Tower',
        destination: 'Summarecon Mall Serpong'
      },
      function(err, data) {
        if (err) return console.log(err);
        console.log('distance = ',data);
      });
  res.render('index', { title: 'Exercise Expresses123' });
});

router.get('/api/current_user', (req, res) => {
  res.send(req.user);
  // res.send(req.session);
});

router.get('/api/logout', (req, res) => {
  req.logout();
  res.send(req.user);
});

module.exports = router;
