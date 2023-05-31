const express = require('express');
const router = express.Router();

const volumeController = require('../controllers/volume-controller');

router.post('/new', volumeController.addNewVolume)
router.get('/', volumeController.getAllVolumes)
router.get('/search/:name', volumeController.getVolumeByName)



module.exports = router;