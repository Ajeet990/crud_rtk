// import { db } from "../dbConnect.js";
import jwt from "jsonwebtoken";
import { findUserByEmail, registerModel, checkUserName, validateOTPModel } from "../models/authModel.js";

export const login = (req, res) => {
    const useremail = req.body.user_email
    const password = req.body.user_password
    // console.log(useremail)
    findUserByEmail(useremail, (err, data) => {
        // console.log(data)
        if (err) return res.status(404).json({ "message": err })
        if (data.length != 0) {

            if (password == data[0].password) {
                return res.status(200).json({
                    success: true,
                    message: "Login success",
                    data: {
                        id: data[0].id,
                        email: data[0].email,
                        username: data[0].user_name,
                        token: jwt.sign({ id: data[0].id, email: data[0].email }, process.env.SECRET_KEY)
                    }
                })
            } else {
                return res.status(200).json({
                    success: false,
                    message: "Wrong Password.",
                    data: []
                })
            }
        } else {
            return res.status(200).json({
                success: false,
                message: "User not registered",
                data: []
            })
        }
    })

}

export const register = (req, res) => {
    const userDetail = {
        name: req.body.name,
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        profile_pic: req.body.profile_pic,
        user_verified: req.body.otp
    }
    // console.log(userDetail)
    findUserByEmail(req.body.email, (err, emailData) => {
        if (err) return res.status(500).json({ message: err })
        if (emailData.length != 0) {
            return res.status(200).json({
                success: false,
                message: "Email already exist"
            })
        } else {
            checkUserName(req.body.user_name, (err, userNameData) => {
                if (err) return res.status(500).json({ message: err })
                if (userNameData.length != 0) {
                    return res.status(200).json({
                        success: false,
                        message: "This user_name already in use."
                    })
                } else {
                    registerModel(userDetail, (err, data) => {
                        if (err) return res.status(404).json({ "message": err })
                        return res.status(200).json({
                            success: true,
                            message: "User registerd successfully."
                        })
                    })
                }
            })
        }
    })


}

export const validateOTP = (req, res) => {
    const otp_detail = {
        otp: req.body.otp,
        email: req.body.email
    }
    console.log(otp_detail)
    validateOTPModel(otp_detail, (err, data) => {
        if (err) return res.status(404).json({ "message": err })
        if (data[0].success) {
            return res.status(200).json({
                success: true,
                message: "OTP verified"
            })
        } else {
            return res.status(200).json({
                success:false,
                message:"Wrong OTP"
            })
        }
    })
}