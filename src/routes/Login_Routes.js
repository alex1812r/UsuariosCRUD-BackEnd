const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/Login_Controller');

router.post('/', LoginController.login);

module.exports = router;