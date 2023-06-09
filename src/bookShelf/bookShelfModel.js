var mongoose = require('mongoose')
const bookShelf = new mongoose.Schema (
    {
        user: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
            require: true
        },
        volumes: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Volume',
            require: true
        }],
        name: {
            type: String,
            require: true
        }
    }
);

module.exports= mongoose.model('Shelf', bookShelf);