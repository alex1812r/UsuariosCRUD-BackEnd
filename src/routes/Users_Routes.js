const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

const UsersController = require('../controllers/Users_Controller');

router.get('/', UsersController.getAll);

router.get('/:id', UsersController.get);

router.post('/', UsersController.create);

router.put('/:id', UsersController.update);

router.delete('/:id', UsersController.delete);

module.exports = router;