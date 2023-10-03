import { db } from "../dbConnect.js";

export const userModel = (result) => {
    const is_active = 1;
    const q = "select * from users where is_active = ?"
    db.query(q, [is_active], (err, data) => {
        if (err) {
            return result(err, null)
        }
        // console.log(data)
        result(null, data)
    })
}

export const findUserModel = (userId, result) => {
    const q = "select * from users where id = ?"
    db.query(q, [userId], (err, data) => {
        if (err) return result(err, null)
        return result(null, data)
    })
}

export const deleteUserModel = (userId, result) => {
    const q = "delete from users where id = ?"
    db.query(q, [userId], (err, data) => {
        if (err) return result(err, null)
        return result(null, data)
    })
}

export const updateUserModel = (userDetail, result) => {
    const q = "UPDATE users set name = ?, user_name = ?, email = ?, address = ? where id = ?"
    db.query(q, [userDetail.name, userDetail.user_name, userDetail.email, userDetail.address, userDetail.userId], (err, data) => {
        if (err) return result(err, null)
        return result(null, data)
    })
}

