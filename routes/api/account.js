const express = require('express');
const accountController = require('../../controllers/account');

const router = express.Router();

const adminAccess = require('../../middlewares/admin');
const auth = require('../../middlewares/auth');

router.get('/', adminAccess, accountController.getAllAccounts);
router.get('/:accountNum', auth, accountController.getAccount);
router.post('/', auth, accountController.getAllTransHis);
router.post('/create', accountController.createAccount);
router.post('/deposit', accountController.depositAmount);
router.post('/withdraw', auth, accountController.withdrawAmount);
router.put('/transfer', auth, accountController.transferAmount);
router.delete('/delete', adminAccess, accountController.deleteAccount);

module.exports = router;
