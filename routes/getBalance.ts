import express, { Response, Request } from 'express'
const router = express.Router()
import { User } from '../models/user'
import { body, validationResult } from 'express-validator'

const validateRequest = [
    body('accountNumber').isNumeric().withMessage('Please provide a valid account Number'),
]

router.get('/api/ttbank/getbalance', validateRequest, async (req: Request, res: Response) => {
    console.table(req.body);
    let { accountNumber } = req.body;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        try {
            let userParams = { accountID: accountNumber }
            let result = await getAmount(userParams);
            console.log(result);
            if (result.errors) {
                res.status(400).send(result)
            }
            else {
                res.status(200).send({ message: 'Success', result })
            }
        } catch (error: any) {
            res.status(400).send({ error: { message: error.message } })
        }
    }

})


const getAmount: any = async (userParams: any) => {
    try {
        const user = await User.findOne(userParams,{amount: 1, _id:0});
        if (user)
        {
            return user;
        }
        else
        {
            return ({errors: {message: "Account number does not exist."}})
        }
    } catch (error: any) {
        return (error.message)
    }
}

export { router as getBalance } 