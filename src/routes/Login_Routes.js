const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/Login_Controller');
const verifyToken = require('../controllers/verifyToken');

router.post('/', LoginController.login);

router.delete('/', LoginController.logout);

module.exports = router;