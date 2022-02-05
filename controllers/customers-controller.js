const { validationResult } = require("express-validator");
const Customer = require("../models/Customer");

let CUSTOMERS = [
  new Customer(1, "Arisha Barron", 33),
  new Customer(2, "Branden Gibson", 33),
  new Customer(3, "Rhonda Church", 33),
  new Customer(4, "Georgina Hazel", 33),
];

const signUp = (req, res) => {
  const { name, initialDeposit } = req.body;
  const newCustomer = new Customer(CUSTOMERS.length + 1, name, initialDeposit);
  CUSTOMERS.push(newCustomer);
  console.log(newCustomer.id);
  res.status(201).send({ customer: newCustomer.details });
};

const balanceInquiry = (req, res) => {
  const { id } = req.params;
  const customer = CUSTOMERS.find((customer) => customer.id == id);
  console.log(customer);
  if (customer) {
    res.status(200).json({ balance: customer.balance });
  } else res.status(404).json({ Error: "No account found" });
};

const transferHistory = (req, res) => {
  const { id } = req.params;
  const customer = CUSTOMERS.find((customer) => customer.id == id);
  if (customer) {
    if (customer.transferHistory.length > 0) {
      res.status(200).json({ transferHistory: customer.transferHistory });
    } else {
      res
        .status(401)
        .json({ Error: "No transfer history found" });
    }
  } else res.status(404).json({ Error: "No account found " });
};

const transferAmount = (req, res) => {
  const { senderId, receiverId, transferAmount } = req.body;
  const sender = CUSTOMERS.find((customer) => customer.id == senderId);
  const receiver = CUSTOMERS.find((customer) => customer.id == receiverId);
  if (!sender) {
    return res.status(401).json({ Error: "Sender id is invalid!" });
  }
  if (!receiver) {
    return res.status(401).json({ Error: "Receiver id is invalid!" });
  }
  if (parseInt(senderId) === parseInt(receiverId)) {
    return res
      .status(422)
      .json({ Error: "Sender and Receiver id both can't be same!" });
  }
  if (parseInt(sender.balance) < parseInt(transferAmount)) {
    return res.status(422).json({
      Error:
        "Your current balance is insufficient to perform this transaction!",
    });
  } else {
    const receipt = sender.sendAmount(receiverId, transferAmount);
    receiver.receiveAmount(senderId, transferAmount);
    return res.status(201).json({ receipt: receipt });
  }
};

exports.signUp = signUp;
exports.balanceInquiry = balanceInquiry;
exports.transferAmount = transferAmount;
exports.transferHistory = transferHistory;