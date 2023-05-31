let BookShelf = require('../models/bookshelf.model');
const HttpError = require("../models/http-error");
let User = require('../models/user.model');


const getAllBookshelves = async (req, res, next) => {
    try {
        const shelves = await BookShelf.find().populate('user').populate('volumes');
        if (Array.isArray(shelves) && shelves.length < 1){
            return res.status(404).json({message: "No Shelves found"});   
        }
        else{
            // return only the public book shelves
            var temp_shelves = []
            for (var i=0; i<shelves.length; i++){
                if (shelves[i].isPublic == true){
                    temp_shelves.push(shelves[i]);
                }
            }
            res.status(201).json(temp_shelves)
        }
    } catch (err) {
      return next(new HttpError(err.message, 500));
    }
};


const addNewBookShelf = async(req, res, next) => {
    const name = req.body.name;
    var isPublic = true;
    if (req.body.public == "false" ){
        isPublic = false;
    }
    const volumes = []; //empty list at the beginning
    const user = req.body.user;
    
    const newShelf = new BookShelf({ name, isPublic, volumes, user });
    newShelf
      .save()
      .then(() => res.json({ message: "BookShelf added!", bookshelf: newShelf }))
      .catch((err) => res.status(400).json("Error: " + err));
}

const makePublic = async(req, res, next) => {
    const bookshelfId = req.params.bookshelf;
    const password = req.body.password;
    const username = req.body.username;

    //check if the user is present and get the user 
    const bookshelf = await BookShelf.findById(bookshelfId).populate('user');
    console.log("BOOKSHELF: ", bookshelf)
    if (bookshelf == null){
        return res.status(404).json({message: "Invalid BookShelf ID"});
    }
    //make sure book shelf belongs to the user specified above
    if (bookshelf.user.username == username && bookshelf.user.password == password){
        bookshelf.isPublic = true;
        await bookshelf.save();
        return res.status(202).json({message: "BookShelf was made public"})
    }
    else{
        return res.status(400).json({message:"BookShelf does not belong to the user"})
    }

}

const makePrivate = async(req, res, next) => {
    const bookshelfId = req.params.bookshelf;
    const password = req.body.password;
    const username = req.body.username;

    //check if the user is present and get the user 
    const bookshelf = await BookShelf.findById(bookshelfId).populate('user');
    console.log("BOOKSHELF: ", bookshelf)
    if (bookshelf == null){
        return res.status(404).json({message: "Invalid BookShelf ID"});
    }
    //make sure book shelf belongs to the user specified above
    if (bookshelf.user.username == username && bookshelf.user.password == password){
        bookshelf.isPublic = false;
        await bookshelf.save();
        return res.status(202).json({message: "BookShelf was made private"})
    }
    else{
        return res.status(400).json({message:"BookShelf does not belong to the user"})
    }

}

const addVolume = async(req, res, next) => {
    const bookshelfId = req.params.bookshelf;
    const volume = req.body.volume;
    const username = req.body.username;
    const password = req.body.password;

    //check if the user is present and get the user 
    const bookshelf = await BookShelf.findById(bookshelfId).populate('user');
    console.log("BOOKSHELF: ", bookshelf)
    if (bookshelf == null){
        return res.status(404).json({message: "Invalid BookShelf ID"});
    }
    //make sure book shelf belongs to the user specified above
    if (bookshelf.user.username == username && bookshelf.user.password == password){
        bookshelf.volumes.push(volume);
        await bookshelf.save();
        return res.status(202).json({message: "Volume was added to bookshelf", bookshelf})
    }
    else{
        return res.status(400).json({message:"BookShelf does not belong to the user"})
    }

}

const deleteBookShelf = async (req, res, next) => {
    const bookshelf_id  = req.params.bookshelf;
    try {
        const bookshelf = await BookShelf.findById(bookshelf_id);
        
        if (!bookshelf) {
        return res.status(404).json({ message: "Bookshelf not found" });
        }
        
        await BookShelf.findByIdAndDelete(bookshelf_id);
        
        res.status(200).json({ message: "Bookshelf deleted successfully" });
    } catch (err) {
        return next(new HttpError(err.message, 500));
    }
};

exports.getAllBookshelves = getAllBookshelves;
exports.addNewBookShelf = addNewBookShelf;
exports.makePublic = makePublic;
exports.makePrivate = makePrivate;
exports.addVolume = addVolume;
exports.deleteBookShelf = deleteBookShelf;
