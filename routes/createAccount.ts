import express, { Response, Request } from 'express'
const router = express.Router()
import { User } from '../models/user'
import { Password } from '../utils/pinHash';
import { body, validationResult } from 'express-validator'

const validateRequest = [
    body('firstName').isString().withMessage('Please provide a first name'),
    body('lastName').isString().withMessage('Please provide a last name'),
    body('dob').isString().withMessage('Please provide a valid dob'),
    body('pin').isNumeric({ no_symbols: true }).isLength({ min: 4, max: 4 }).withMessage('Please provide a valid four digit PIN'),
    body('cnic').isNumeric({ no_symbols: true }).isLength({ min: 13, max: 13 }).withMessage('Please provide a valid CNIC. It should be of length 13'),
    body('amount').isNumeric({ no_symbols: true }).withMessage('Please provide a amount.').isFloat({ min: 0}).isCurrency({allow_negatives: false, require_symbol: false}),
]

router.post('/api/ttbank/createaccount', validateRequest,
    async (req: Request, res: Response) => {
        let { firstName, lastName, dob, pin, cnic, amount } = req.body;
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            let userParams = {
                firstName,
                lastName,
                dob,
                pin,
                cnic,
                amount
            }
            try {
                let result = await createUser(userParams);
                if (result.errors) {
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


const createUser: any = async (userParams: any) => {
    try {
        let accountID = Date.now();
        const user = User.build({
            accountID,
            firstName: userParams?.firstName,
            lastName: userParams?.lastName,
            dob: userParams?.dob,
            pin: await Password.Hash(userParams?.pin),
            cnic: userParams?.cnic,
            amount: userParams?.amount
        });
        await user.save()
        return user;
    } catch (error: any) {
        return (error)
    }
}

export { router as createAccount } 