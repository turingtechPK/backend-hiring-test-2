const Transaction = require("./Transaction");

// Model for "Customer" object
module.exports = class Customer {
  //Public 'id' attribute
  id;
  //Private attributes
  #name;
  #balance;
  #transferHistory = [];
  //Constructor function
  constructor(id, name, initialDeposit) {
    this.id = id; // Adds an "id" property to the object
    this.#name = name;
    this.#balance = initialDeposit;
  }

  //Getter for current balance
  get balance() {
    return this.#balance;
  }

  //Getter for account details
  get details() {
    return {
      id: this.id,
      name: this.#name,
      balance: this.#balance,
    };
  }

  get transferHistory() {
    const list = [];
    for (let i = 0; i < this.#transferHistory.length; i++) {
      list.push(this.#transferHistory[i].details);
    }
    return list;
  }

  //Method for sending amount
  sendAmount(receiverId, transferAmount) {
    this.#balance -= transferAmount; //Debiting the sender's account
    //Creating new transaction object
    const transaction = new Transaction(
      this.#transferHistory.length + 1,
      this.id,
      receiverId,
      this.transferAmount,
      "Sent"
    );
    this.#transferHistory.push(transaction);
    return transaction.details;
  }

  //Method for receiving amount
  receiveAmount(senderId, transferAmount) {
    this.#balance += transferAmount; //Crediting the receiver's account
    //Creating new transaction object
    const transaction = new Transaction(
      this.#transferHistory.length + 1,
      senderId,
      this.id,
      this.transferAmount,
      "Received"
    );
    this.#transferHistory.push(transaction);
  }
};
