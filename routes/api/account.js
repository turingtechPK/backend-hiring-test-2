const express = require('express');
const accountController = require('../../controllers/account');

const router = express.Router();

const auth = require('../../middlewares/auth');

router.get('/', accountController.getAllAccounts);
router.get('/:accountNum', auth, accountController.getAccount);
router.post('/', auth, accountController.getAllTransHis);
router.post('/create', accountController.createAccount);
router.post('/deposit', accountController.depositAmount);
router.post('/withdraw', auth, accountController.withdrawAmount);
router.put('/transfer', auth, accountController.transferAmount);
router.delete('/delete', accountController.deleteAccount);

module.exports = router;
