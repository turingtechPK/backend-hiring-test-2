var Express = require ('express')
var controller = require ('./bookShelfController')
const router= Express.Router();

router.post ('/addShelf/user:uid/volume:vid', controller.addBookToShelf)
router.get ('/getShelves/user:uid', controller.getShelvesOfUser)
router.delete ('/deleteShelf/shelf:sid', controller.deleteVolumeFromShelf)
module.exports = router;