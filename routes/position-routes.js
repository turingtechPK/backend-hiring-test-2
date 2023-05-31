const express = require('express');
const router = express.Router();

const positionController = require('../controllers/position-controller');

router.post('/new', positionController.addNewPosition)
router.get('/', positionController.getAllPositions)


module.exports = router;