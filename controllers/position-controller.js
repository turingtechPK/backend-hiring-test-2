let Position = require('../models/position.model');

const getAllPositions = async (req, res, next) => {
    try {
        Position.find().populate('volume').populate('user')
        .then((pos) => res.status(201).json(pos))
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (err) {
      return next(new HttpError(err.message, 500));
    }
};


const addNewPosition = async(req, res, next) => {
    const volume = req.body.volume;
    const user = req.body.user;
    const position = req.body.position;

    const temp_pos = await Position.find({volume, user});
    if (Array.isArray(temp_pos) && temp_pos.length > 0){
        //user has already given a review of the volume
        return res.status(409).json({ message: "Position already present!", position: temp_pos })
    }
    
    const newPos = new Position({ volume, user, position });
    newPos
      .save()
      .then(() => res.json({ message: "Position added!", position: newPos }))
      .catch((err) => res.status(400).json("Error: " + err));
}

exports.getAllPositions = getAllPositions;
exports.addNewPosition = addNewPosition;
