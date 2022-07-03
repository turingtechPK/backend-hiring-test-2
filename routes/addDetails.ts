import express, { Response, Request } from 'express'
const router = express.Router()
import { User } from '../models/user'
import { body, validationResult } from 'express-validator'

const validateRequest = [
    body('email').isEmail().normalizeEmail(),
    body('phoneNumber').isMobilePhone('en-PK', { strictMode: true }).withMessage('Please provide a Pakistani Number'),
    body('cnic').isNumeric({ no_symbols: true }).isLength({ min: 13, max: 13 }).withMessage('Please provide a valid CNIC. It should be of length 13')
]

router.post('/api/ttbank/adddetails', validateRequest, async (req: Request, res: Response) => {
    console.table(req.body);
    let { email, phoneNumber, cnic } = req.body;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        try {
            let userParams = { cnic, email, phoneNumber }
            let result = await addDetails(userParams);
            console.log(result);
            if (result.errors) {
                res.status(400).send({ error: { message: result.errors.message } })
            }
            else {
                res.status(200).send({ message: 'Success', result })
            }
        } catch (error: any) {
            res.status(400).send({ error: { message: error.message } })
        }
    }

})


const addDetails: any = async (userParams: any) => {
    const searchParams = {
        cnic: userParams?.cnic
    }
    try {
        const user = await User.find(searchParams);
        if (user.length === 0) {
            return ({ errors: { message: 'No user accounts found with this CNIC' } })
        }
        else {
            try {
                await User.updateMany(searchParams, { $set: { email: userParams?.email, phoneNumber: userParams?.phoneNumber } })
                return ({data:{email: userParams?.email, phoneNumber: userParams?.phoneNumber}});
            } catch (error: any) {
                return (error)
            }

        }

    } catch (error: any) {
        return (error.message)
    }
}

export { router as addDetails } 