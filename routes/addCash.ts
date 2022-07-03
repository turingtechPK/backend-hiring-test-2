import express, { Response, Request } from 'express'
const router = express.Router()
import { User } from '../models/user'
import { Password } from '../utils/pinHash';
import { body, validationResult } from 'express-validator'

const validateRequest = [
    body('accountNumber').isNumeric().withMessage('Please provide a valid account number'),
    body('amount').isNumeric().withMessage('Please provide a valid amount').isCurrency({allow_negatives: false, require_symbol: false}),
]

router.post('/api/ttbank/addcash', validateRequest,
    async (req: Request, res: Response) => {
        let { accountNumber, amount} = req.body;
        console.table(req.body);
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            let transferParams = {
                accountNumber,
                amount,
            }
            try {
                let result = await addCash(transferParams);
                if (result.errors) {
                    res.status(400).send({ error: { message: result.errors } })
                }
                else if (result.error) {
                    res.status(400).send({ error: result.error })
                }
                else {
                    res.status(200).send({ message: 'Amount added successfully.', result })
                }
            } catch (error: any) {
                res.status(400).send({ error: { message: error.message } })
            }
        }
    })


const addCash: any = async (transferParams: any) => {
    try {
        const accountNumber = {
            accountID: transferParams?.accountNumber,
        }
        let dbUserFrom: any = await User.findOne(accountNumber)
        if (dbUserFrom) {
            try {
                await User.updateOne(accountNumber,{$inc: {amount: transferParams?.amount}})
                return ({data: {accountNumber:accountNumber.accountID ,amountAdded: transferParams?.amount}})
            } catch (error: any) {
                return (error)
            }
            
        }
        else {
            return ({ error: { message: 'No User With This Account Number Exists' } })
        }

    } catch (error: any) {
        return (error)
    }
}

export { router as addCash } 