var mongoose = require('mongoose')
const userSchema = new mongoose.Schema (
    {
        username: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        readingPosition: [{
            page: {
                type: Number
            },
            line: {
                type: Number
            },
            word: {
                type: Number
            },
            volume: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Volume',
                unique: true
            },
        }],
    },
    {
        timestamps: true
    }
);
module.exports= mongoose.model('User', userSchema);