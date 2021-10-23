const express = require("express");
const { check } = require("express-validator");

const customersController = require("../controllers/customers-controller");

const router = express.Router();

router.post(
  "/signUp",
  [check("name").not().isEmpty(), check("initialDeposit").not().isEmpty()],
  customersController.signUp
);

router.get("/balanceInquiry/:id", customersController.balanceInquiry);

router.get("/transferHistory/:id", customersController.transferHistory);

router.post(
  "/transferAmount",
  [
    check("senderId").not().isEmpty(),
    check("receiverId").not().isEmpty(),
    check("transferAmount").not().isEmpty(),
  ],
  customersController.transferAmount
);

module.exports = router;
