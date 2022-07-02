const Account = require('../models/accountModel');
const RichError = require('../utils/richError');
const catchAsync = require('../utils/catchAsync');

exports.getAllAccounts = catchAsync(async (req, res, next) => {
  const allAccounts = await Account.find();
  res.status(200).json({
    status: 'success',
    results: allAccounts.length,
    data: {
      allAccounts,
    },
  });
});

exports.getAccount = catchAsync(async (req, res, next) => {
  const account = await Account.findOne({ account: req.params.account });
  if (!account) {
    return next(new RichError('No account found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      account,
    },
  });
});

exports.createAccount = catchAsync(async (req, res, next) => {
  const newTour = await Account.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
});

exports.updateAccount = catchAsync(async (req, res, next) => {
  const account = await Account.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!account) {
    return next(new RichError('No account found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      account,
    },
  });
});

exports.deleteAccount = catchAsync(async (req, res, next) => {
  const account = await Account.findOneAndDelete(req.body.account);
  if (!account) {
    return next(new RichError('No account found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
