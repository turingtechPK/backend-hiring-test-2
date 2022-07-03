const Account = require('../models/accountModel');
const TransHis = require('../models/transHistoryModel');
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
  const transHis = await Account.find({
    accountNumber: req.params.accountNum,
  });
  if (!transHis) {
    return next(new RichError('No account found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    results: transHis.length,
    data: {
      transHis,
    },
  });
});

exports.getAllTransHis = catchAsync(async (req, res, next) => {
  const account = await Account.findOne({
    accountNumber: req.body.accountNumber,
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
  await TransHis.create({
    accountNumber: req.body.accountNumber,
    depositAmount: req.body.amount,
    netAmount: valueAfterDeposit,
    createdAt: new Date().toISOString(),
  });
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
  await TransHis.create({
    accountNumber: req.body.accountNumber,
    withdrawAmount: req.body.amount,
    netAmount: valueAfterWithdraw,
    createdAt: new Date().toISOString(),
  });
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
  let transferWithdraw = null;
  if (accountTransferOut.amount >= amountOfTransaction) {
    transferWithdraw = accountTransferOut.amount - amountOfTransaction;
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
  await TransHis.create({
    accountNumber: req.body.outAccount,
    withdrawAmount: amountOfTransaction,
    netAmount: transferWithdraw,
    createdAt: new Date().toISOString(),
  });
  await TransHis.create({
    accountNumber: req.body.accountNumber,
    transferAmount: amountOfTransaction,
    netAmount: transferDeposit,
    createdAt: new Date().toISOString(),
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
