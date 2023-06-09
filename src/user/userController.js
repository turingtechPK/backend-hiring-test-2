const user = require ('./userModel')
const volume = require('../volume/volumeModel')
const addUser = function (req,res,next)
{
    try {
    const username= req.body.username;
    user.findOne({username: username})
    .then(async (foundData) => {
        if (foundData)
        {
            res.send ('Username already Exists')
        }
        else
        {
            const newUser = user ({
                username: req.body.username,
                password: req.body.password
            })
            newUser.save().then (
                res.send ('User Created')
            )
        }
    })
    }
    catch(e) {
        res.send(e)
    }
};
const logIn = async function (req,res)
{
    const username= req.body.username;
    try {
    user.findOne({username: username})
    .then(async (foundData) => {
        if (foundData.password === req.body.password)
        {
            res.send ('Approved')
        }
        else
        {
            res.send ('Invalid')
        }
    })
    }
    catch (e) {
        res.send (e)
    }
};

const addReadingPosition = async function(req,res)
{
    try {
        const volumeSchema = await volume.findById(req.params.vid);
        const readingPositionData = {
            page: req.body.page,
            line: req.body.line,
            word: req.body.word,
            volume: volumeSchema
        };
        const updatedData = await user.findByIdAndUpdate(req.params.uid,{$push: {readingPosition: readingPositionData }})
        res.send('Reading Position Added')
        }
        catch(e) {
            res.send(e)
        }
}

const getUserData = async function (req,res) 
{
    try {
    const userData = await user.find({_id: req.params.uid}).populate("readingPosition")
    return res.send(userData)
    }
    catch(e) {
        return res.send(e)
    }
}

module.exports = {
    addUser,
    logIn,
    addReadingPosition,
    getUserData
}