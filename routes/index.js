const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
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
