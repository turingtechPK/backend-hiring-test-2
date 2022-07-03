import express, { Response, Request } from 'express'
const router = express.Router()
import { User } from '../models/user'
import { Password } from '../utils/pinHash';
import { body, validationResult } from 'express-validator'

const validateRequest = [
    body('accountNumberTo').isNumeric().withMessage('Please provide a valid account number'),
    body('accountNumberFrom').isNumeric().withMessage('Please provide a valid account number'),
    body('amount').isNumeric().isCurrency({allow_negatives: false, require_symbol: false}).withMessage('Please provide a valid amount'),
    body('pin').isNumeric({ no_symbols: true }).isLength({ min: 4, max: 4 }).withMessage('Please provide a valid four digit PIN')
]

router.post('/api/ttbank/transferamount', validateRequest,
    async (req: Request, res: Response) => {
        let { accountNumberTo, accountNumberFrom, amount, pin } = req.body;
        console.table(req.body);
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            let transferParams = {
                accountNumberTo,
                accountNumberFrom,
                amount,
                pin
            }
            try {
                let result = await transferAmount(transferParams);
                if (result.errors) {
                    res.status(400).send({ error: { message: result.errors } })
                }
                else if (result.error) {
                    res.status(400).send({ error: result.error })
                }
                else {
                    res.status(200).send({ message: 'Transfer Successful', result })
                }
            } catch (error: any) {
                res.status(400).send({ error: { message: error.message } })
            }
        }
    })


const transferAmount: any = async (transferParams: any) => {
    try {
        const accountFromParams = {
            accountID: transferParams?.accountNumberFrom,
        }
        const accountToParams = {
            accountID: transferParams?.accountNumberTo,
        }
        let dbUserFrom: any = await User.findOne(accountFromParams)
        if (dbUserFrom) {
            if (await Password.Compare(transferParams?.pin, dbUserFrom?.pin) === false) {
                return ({ error: { message: 'Invalid PIN' } })
            }
            else {
                if (dbUserFrom?.amount <= 0)
                {
                    return ({ error: { message: 'You do not have enough balance.' } })
                }
                else if (dbUserFrom?.amount < parseInt(transferParams?.amount))
                {
                    return ({ error: { message: 'You do not have enough balance.' } })
                }
                else
                {
                    try {
                        let dbUserTo: any = await User.findOne(accountToParams)
                        if (dbUserTo) {
                            try {
                                const transfer = await User.updateOne(accountToParams,
                                    { $inc: { amount: transferParams?.amount } })
                                const deduct = await User.updateOne(accountFromParams,
                                    { $inc: { amount: -transferParams?.amount } })
                                const transferDetailsFrom = {
                                    trasnferTo: transferParams?.accountNumberTo,
                                    transferFrom: transferParams?.accountNumberFrom,
                                    amountTransferred: transferParams?.amount,
                                    transactionType: "Sent",
                                    transactionTime: new Date().toUTCString()
                                }
                                const transferDetailsTo = {
                                    trasnferTo: transferParams?.accountNumberTo,
                                    transferFrom: transferParams?.accountNumberFrom,
                                    amountTransferred: transferParams?.amount,
                                    transactionType: "Received",
                                    transactionTime: new Date().toUTCString()
                                }
                                await User.updateOne(
                                    accountToParams,
                                    { $push: { transactionHistory: transferDetailsTo } }
                                 )
                                 await User.updateOne(
                                    accountFromParams,
                                    { $push: { transactionHistory: transferDetailsFrom } }
                                 )
                                 return ({data: {TransactionDetails: transferDetailsFrom, transferDetailsTo} })
                            } catch (error: any) {
                                return (error)
                            }
                        }
                        else {
                            return ({ error: { message: 'You cannot transfer to this account as this account does not exist.' } })
                        }
                    } catch (error: any) {
                        return (error)
                    }
                }
            }
            // const user = User.aggregate()
            // return user;
        }
        else {
            return ({ error: { message: 'No User With This Account Number Exists' } })
        }

    } catch (error: any) {
        return (error)
    }
}

export { router as transferAmount } 