import express from 'express'
import { sendMail } from '../utils/sendMail.js'
const router = express.Router()
import { login, register, validateOTP } from '../controllers/authController.js'


router.post('/login', login)
router.post('/register', register)
router.post('/sendMail', sendMail)
router.post('/validateOTP', validateOTP)

export default router