const express = require('express');
const router = express.Router();

const bookshelfController = require('../controllers/bookshelf-controller');

router.post('/new', bookshelfController.addNewBookShelf)
router.get('/', bookshelfController.getAllBookshelves)
router.patch('/makePublic/:bookshelf', bookshelfController.makePublic)
router.patch('/makePrivate/:bookshelf', bookshelfController.makePrivate)
router.patch('/addVolume/:bookshelf', bookshelfController.addVolume)
router.delete('/:bookshelf', bookshelfController.deleteBookShelf)

module.exports = router;