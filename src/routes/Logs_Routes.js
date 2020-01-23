const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('GET LOGS');
});

router.post('/', (req, res) => {
  res.send('POST LOGS');
});

router.get('/action', (req, res) => {
  res.send('GET LOGS ACTION');
});

module.exports = router;