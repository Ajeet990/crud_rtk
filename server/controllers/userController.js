// import { db } from "../dbConnect.js";
import jwt from "jsonwebtoken";
import { userModel, findUserModel, deleteUserModel, updateUserModel } from "../models/userModel.js";

export const allUsers = (req, res) => {
    userModel((err, data) => {
        // const {password, ...otherData} = data
        if (err) return res.status(400).json({"messge":err})
        res.status(200).json({
            success : true,
            message : "List of all users.",
            data:data
        })
    });
}

export const findUser = (req, res) => {
    // console.log(req.get('token'))
    const userDetails = jwt.decode(req.get('token'))
    const userId = req.params.id
    findUserModel(userId, (err, data) => {
        if (err) return res.status(404).json({"message":err})
        if(data.length != 0) {
            return res.status(200).json({
                success : true,
                message:"User Details.",
                data:data
            })
        } else {
            return res.status(200).json({
                success : false,
                message:"User not found.",
                data:[]
            })
        }
    })
}

export const deleteUser = (req, res) => {
    const userId = req.body.userId
    deleteUserModel(userId, (err, data) => {
        if (err) return res.status(404).json({"message":err})
        return res.status(200).json({
            success:true,
            message:"User removed successfully."
        })
    })
}

export const updateUser = (req, res) => {
    const userDetail = {
        userId:req.body.userId,
        name:req.body.name,
        user_name:req.body.user_name,
        email:req.body.email,
        address:req.body.address
    }
    // console.log(userDetail)
    updateUserModel(userDetail, (err, data) => {
        if (err) return res.status(404).json({"message":err})
        return res.status(200).json({
            success:true,
            message:"User updated successfully."
        })
    })
}

 

