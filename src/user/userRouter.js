var Express = require ('express')
var controller = require ('./userController')
const router= Express.Router();

router.post ('/addUser', controller.addUser);
router.post ('/login', controller.logIn);
router.patch ('/addReadingPosition/user:uid/volume:vid', controller.addReadingPosition)
router.get ('/getUser/user:uid', controller.getUserData)
module.exports = router;