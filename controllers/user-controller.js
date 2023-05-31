let User = require('../models/user.model');

const getAllAUsers = async (req, res, next) => {
    try {
        User.find()
        .then((users) => res.status(201).json(users))
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (err) {
      return next(new HttpError(err.message, 500));
    }
};

const addNewUser = async(req, res, next) => {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
  
    const newUser = new User({ name, username, password });
    newUser
      .save()
      .then(() => res.json({ message: "User added!", student: newUser }))
      .catch((err) => res.status(400).json("Error: " + err));
}

exports.getAllAUsers = getAllAUsers;
exports.addNewUser = addNewUser;