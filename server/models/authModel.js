import { db } from "../dbConnect.js";

export const findUserByEmail = (userEmail, result) => {
    // console.log(userEmail)
    const q = "select * from users where email = ? and is_active = ?"
    db.query(q, [userEmail, 1], (err, data) => {
        if (err) return result(err, null)
        return result(null, data)
    })
}

export const checkUserName = (userName, result) => {
    const q = "select * from users where user_name = ? and is_active = ?"
    db.query(q, [userName, 1], (err, data) => {
        if (err) return result(err, null)
        return result(null, data)
    })
}

export const registerModel = (userDetail, result) => {
    const q = "INSERT INTO users (name, user_name, email, password, address, profile_pic, user_verified, updated_date) values (?)"
    const vals = [
        userDetail.name,
        userDetail.user_name,
        userDetail.email,
        userDetail.password,
        userDetail.address,
        userDetail.profile_pic,
        userDetail.user_verified,
        '0000-00-00 00:00:00'
    ]
    // console.log(vals)

    db.query(q, [vals], (err, data) => {
        if (err) return result(err, null)
        return result(null, data)
    })
}

export const validateOTPModel = (otpDetail, result) => {
    const q = "select * from users where email = ? and user_verified = ?"
    db.query(q, [otpDetail.email, otpDetail.otp], (err, data) => {
        if (err) return result(err, null)
        if (data.length > 0) {
            const userVerified = 1
            const qq = "UPDATE users set user_verified = ? where email = ?"
            db.query(qq, [userVerified, otpDetail.email], (err, data) => {
                if (err) return result(err, null)
                return result(null, [{success:true}])
            })
        } else {
            return result(null, [{success:false}])
        }
    })
}