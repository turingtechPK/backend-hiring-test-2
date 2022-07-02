const express = require('express');
const accountController = require('../../controllers/account');

const router = express.Router();

router.get('/', accountController.getAllAccounts);
router.get('/:account', accountController.getAccount);
router.post('/create', accountController.createAccount);
router.post('/deposit', accountController.depositAmount);
router.post('/withdraw', accountController.withdrawAmount);
router.put('/transfer', accountController.transferAmount);
router.delete('/delete', accountController.deleteAccount);

module.exports = router;
