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
  const account = await Account.findOne({
    accountNumber: req.params.accountNumber,
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

exports.createAccount = catchAsync(async (req, res, next) => {
  const newTour = await Account.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
});

exports.depositAmount = catchAsync(async (req, res, next) => {
  const account = await Account.findOne({
    accountNumber: req.body.accountNumber,
  });
  if (!account) {
    return next(new RichError('No account found with that ID', 404));
  }
  const saldo = parseInt(account.amount, 10);
  const valueAfterDeposit = saldo + req.body.amount;
  await Account.updateOne(
    { accountNumber: req.body.accountNumber },
    { amount: valueAfterDeposit }
  );
  res.status(200).json({
    status: 'success',
    message: 'Deposit executed successfully.',
  });
});

exports.withdrawAmount = catchAsync(async (req, res, next) => {
  const account = await Account.findOne({
    accountNumber: req.body.accountNumber,
  });
  if (!account) {
    return next(new RichError('No account found with that ID', 404));
  }
  const withdrawValue = parseInt(account.amount, 10);
  const valueAfterWithdraw = withdrawValue - req.body.amount;
  await Account.updateOne(
    { accountNumber: req.body.accountNumber },
    { amount: valueAfterWithdraw }
  );
  res.status(200).json({
    status: 'success',
    message: 'Withdraw executed successfully.',
  });
});

exports.transferAmount = catchAsync(async (req, res, next) => {
  const amountOfTransaction = req.body.amount;
  const accountTransferOut = await Account.findOne({
    accountNumber: req.body.outAccount,
  });
  if (!accountTransferOut) {
    return next(new RichError('No account found with that ID', 404));
  }
  if (accountTransferOut.amount >= amountOfTransaction) {
    const transferWithdraw = accountTransferOut.amount - amountOfTransaction;
    await Account.findByIdAndUpdate(accountTransferOut._id, {
      amount: transferWithdraw,
    });
  } else {
    return res.status(400).json({
      status: 'fail',
      message: 'There is no balance available for the transaction to complete.',
    });
  }
  const accountTransferIn = await Account.findOne({
    accountNumber: req.body.inAccount,
  });
  if (!accountTransferIn) {
    return next(new RichError('No account found with that ID', 404));
  }
  const transferDeposit = accountTransferIn.amount + amountOfTransaction;
  await Account.findByIdAndUpdate(accountTransferIn._id, {
    amount: transferDeposit,
  });
  res.status(200).json({
    status: 'success',
    message: 'Transfer executed successfully.',
  });
});

exports.deleteAccount = catchAsync(async (req, res, next) => {
  const account = await Account.findOneAndDelete({
    accountNumber: req.body.accountNumber,
  });
  if (!account) {
    return next(new RichError('No account found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
