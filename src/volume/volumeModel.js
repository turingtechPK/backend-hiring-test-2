var mongoose = require('mongoose')
const volumeSchema = new mongoose.Schema (
    {
        category: { //book or magzine
            type: String,
            require: true
        },
        title: {
            type: String,
            require: true
        },
        author: {
            type: String,
            require: true
        },
        editor: {
            type: [String]
        },
        publisher: {
            type: String,
            require: true
        },
        language: {
            type: String
        },
        yearOfPublish: {
            type: Number
        },
        pages: {
            type: Number
        },
        version: {
            type: String,
            require: true
        },
        review: [{
            stars: {
                type: Number
            },
            text: {
                type: String
            },
            user: {
                type: mongoose.Schema.Types.ObjectId, ref: 'User',
                require: true,
                unique: true
            },
        }],
        isReviewSubmitted: {
            type: Boolean,
            default: false
        },
        price: {
            type: String
        },
        isAddedToBookShelf: {
            type: Boolean,
            default: false
        },
        isOpened: {
            type: Boolean,
            default: false
        },
        addedInVolume: {
            type: Date,
            default: Date.now()
        }
    },
    {
        timestamps: true,
    }
);
module.exports= mongoose.model('Volume', volumeSchema);