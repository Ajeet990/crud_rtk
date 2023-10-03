import express from 'express'
const router = express.Router()
import { allUsers, findUser, deleteUser, updateUser } from '../controllers/userController.js'

router.get('/', allUsers)
router.get('/find/:id', findUser)
router.post('/delete', deleteUser)
router.post('/update', updateUser)

export default router