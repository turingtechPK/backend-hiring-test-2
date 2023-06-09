var Express = require ('express')
var controller = require ('./volumeController')
const router= Express.Router();

router.post ('/addVolume', controller.addVolume);
router.get ('/getVolumeByTitle', controller.getVolumeByTitle);
router.get ('/getVolumeByAuthor', controller.getVolumeByAuthor);
router.patch ('/addReviews/user:uid/volume:vid', controller.addReviews)

module.exports = router;