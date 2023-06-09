const bookShelf = require("./bookShelfModel");
const userSchema = require("../user/userModel");
const volumeSchema = require("../volume/volumeModel");
const { ObjectId } = require("mongodb");

const addBookToShelf = async function (req, res) {
  const user = await userSchema.findById(req.params.uid);
  const volume = await volumeSchema.findById(req.params.vid);
  if (!user || !volume) 
  {
    return res.send("User or Volume doesnot exists!");
  }
  const _id = new ObjectId(req.params.vid);
  let shelf = await bookShelf.findOne({$and: [{name: req.body.name},{user}]});
  if (shelf) 
  {
    if (shelf.volumes.includes(_id)) 
    {
      return res.send("Volume Already Exist In this Shelf");
    } 
    else 
    {
      shelf.volumes.push(volume);
      await shelf.save();
      return res.send("Volume added successfully to the shelf");
    }
  }
  else {
    const newShelf = bookShelf({
      name: req.body.name,
      user,
      volumes: [],
    });
    newShelf.volumes.push(volume);
    newShelf
      .save()
      .then((createdShelf) => 
      {
        return res.send("Volume added successfully to the Shelf");
      })
      .catch((e) => {
        return res.send(e);
      });
  }
};

const getShelvesOfUser = async function (req,res) 
{
    try {
    const shelves = await bookShelf.find({user: req.params.uid}).populate("volumes user")
    return res.send(shelves)
    }
    catch(e) {
        return res.send(e)
    }
}

const deleteShelf = async function(req,res)
{
  try {
    const data = await bookShelf.findByIdAndDelete({_id: req.params.sid})
    res.send('Shelf Deleted Successfully')
  }
  catch(e) {
    res.send(e)
  }
}

module.exports = {
  addBookToShelf,
  getShelvesOfUser,
  deleteShelf
};
