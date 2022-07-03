const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Account = require('../models/accountModel');

module.exports.verifyAccount = async (req, res) => {
  if (!req.body && !req.body.email && !req.body.password) {
    res.status(204).json({
      status: 'fail',
      message: 'Please provide a valid email or password!',
    });
  }
  const account = await Account.find({ email: `${req.body.email}` });
  const doMatch = await bcrypt.compare(req.body.password, account[0].password);
  if (doMatch) {
    const token = jwt.sign(
      { id: account[0]._id, admin: account[0].admin },
      process.env.SECRET_HASH,
      {
        expiresIn: process.env.EXPIRES_IN,
      }
    );
    res.status(200).json({
      status: 'success',
      data: {
        _id: account[0]._id,
        ownerName: account[0].ownerName,
        email: account[0].email,
        accountNumber: account[0].accountNumber,
        amount: account[0].amount,
        token,
      },
    });
  } else {
    return res.status(403).json({
      status: 'fail',
      message: 'Incorrect password!',
    });
  }
};
