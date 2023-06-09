const volume = require ('./volumeModel')
const user = require ('../user/userModel')

const addVolume = function (req,res,next) {
    try {
    const title= req.body.title
    const version= req.body.version
    const author = req.body.author
    volume.findOne ({$and: [{title: title},{version: version},{author: author}]})
    .then(async (foundData) => {
        if (foundData)
        {
            res.send ('Volume already exists!')
        }
        else
        {
            const newBook = volume ({
                category: req.body.category,
                title: req.body.title,
                author: req.body.author,
                editor: req.body.editor,
                publisher: req.body.publisher,
                langauge: req.body.langauge,
                yearOfPublish: req.body.yearOfPublish,
                pages: req.body.pages,
                version: req.body.version,
                price: req.body.price
            })
            newBook.save().then (
                res.send ('Volume Added')
            )
        }
    })
    }
    catch(e) {
        res.send(e)
    }
};

const getVolumeByTitle = async function (req,res)
{
    const title= req.body.title
    try {
    volume.find ({title: title})
    .then(async (foundData) => {
        if (foundData)
        {
            res.send (foundData._id)
        }
        else
        {
            res.send('No Volume found')
        }
    })
    }
    catch(e) {
        res.send(e)
    }
}

const getVolumeByAuthor = async function (req,res)
{
    const author= req.body.author
    try {
    volume.find ({author: author})
    .then(async (foundData) => {
        if (foundData)
        {
            res.send (foundData)
        }
        else
        {
            res.send('No Volume found')
        }
    })
    }
    catch(e) {
        res.send(e)
    }
};

const addReviews = async function (req,res)
{
    try {
    const userSchema = await user.findById(req.params.uid);
    const reviewData = {
        stars: req.body.stars,
        text: req.body.text,
        user: userSchema
    };
    const updatedData = await volume.findByIdAndUpdate(req.params.vid,{$push: {review: reviewData }})
    console.log(updatedData)
    res.send('Reviews Added')

    }
    catch(e) {
        res.send(e)
    }
}

module.exports = {
    addVolume,
    getVolumeByAuthor,
    getVolumeByTitle,
    addReviews,
}