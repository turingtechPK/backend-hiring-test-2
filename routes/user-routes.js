const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');

router.post('/new', userController.addNewUser)
router.get('/', userController.getAllAUsers)


module.exports = router;