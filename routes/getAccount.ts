import express, { Response, Request } from 'express'
const router = express.Router()
import { User } from '../models/user'
import { body, validationResult } from 'express-validator'

const validateRequest = [
    body('cnic').isNumeric({ no_symbols: true }).isLength({ min: 13, max: 13 }).withMessage('Please provide a valid CNIC. It should be of length 13'),
]

router.get('/api/ttbank/getaccounts', validateRequest, async (req: Request, res: Response) => {
    console.table(req.body);
    let { cnic } = req.body;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        try {
            let userParams = { cnic }
            let result = await getAccounts(userParams);
            console.log(result);
            if (result.length === 0) {
                res.status(400).send({ error: { message: 'No user accounts found with this CNIC' } })
            }
            else if (result.errors) {
                res.status(400).send({ error: { message: result.errors } })
            }
            else {
                res.status(200).send({ message: 'Success', result })
            }
        } catch (error: any) {
            res.status(400).send({ error: { message: error.message } })
        }
    }

})


const getAccounts: any = async (userParams: any) => {
    try {
        const user = await User.find(userParams, {_id:0});
        return user;
        
    } catch (error: any) {
        return (error.message)
    }
}

export { router as getAccount } 