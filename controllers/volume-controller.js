let Volume = require('../models/volume.model');

const getAllVolumes = async (req, res, next) => {
    try {
        Volume.find()
        .then((vol) => res.status(201).json(vol))
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (err) {
      return next(new HttpError(err.message, 500));
    }
};

const getVolumeByName = async (req, res, next) => {
  const name = req.params.name;
  //console.log("NAME:",name)
  try {
    const vol = await Volume.find({ name });
    if (vol.length === 0) {
      return res.status(404).json({ message: "Volume not found" });
    }
    res.status(200).json(vol);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const addNewVolume = async(req, res, next) => {
    const name = req.body.name;
    const text = req.body.text;
  
    const newVolume = new Volume({ name, text });
    newVolume
      .save()
      .then(() => res.json({ message: "Volume added!", volume: newVolume }))
      .catch((err) => res.status(400).json("Error: " + err));
}

exports.getAllVolumes = getAllVolumes;
exports.addNewVolume = addNewVolume;
exports.getVolumeByName = getVolumeByName;