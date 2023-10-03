import jwt from 'jsonwebtoken'
import {findUserByEmail} from '../models/authModel.js'

export const verifyToken = (req, res, next) => {
    const decode_jwt = jwt.decode(req.get('token'))
    if (decode_jwt != null) {
        const {email : userEmail} = decode_jwt
        // console.log(email)
        findUserByEmail(userEmail, (err, data) => {
            if (err) return res.status(404).json({message:"Something went wrong"})
            if (data.length != 0) {
                next()
            }
        })
    } else {
        // console.log("Token not found. Please check token")
        return res.status(400).json({message:"Invalid token or token not found..."})

    }
}