const moment = require("moment");

module.exports = class Transaction {
  //Private attributes
  #id;
  #senderId;
  #receiverId;
  #transferAmount;
  #transferType;
  #transactionTime;
  //Constructor function
  constructor(id, senderId, receiverId, transferAmount, transferType) {
    this.#id = id; // Adds an "id" property to the object
    this.#senderId = senderId;
    this.#receiverId = receiverId;
    this.#transferAmount = transferAmount;
    this.#transferType = transferType;
    this.#transactionTime = `${moment(Date.now()).format(
      "dddd, MMMM Do YYYY, h:mm A"
    )}`;
  }

  //Getter for transaction details
  get details() {
    return {
      senderId: this.#senderId,
      receiverId: this.#receiverId,
      transferAmount: this.#transferAmount,
      transferType: this.#transferType,
      transactionTime: this.#transactionTime,
    };
  }
};