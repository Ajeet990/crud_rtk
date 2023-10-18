import * as YUP from 'yup'

export const addNewUserSchema = YUP.object({
    name:YUP.string().min(4).max(20).required("Please enter your name"),
    username:YUP.string().min(5).max(30).required("Please enter your username"),
    email:YUP.string().email().required("Please enter your email address"),
    address:YUP.string().required("Please enter your address"),
    password:YUP.string().min(6).required("Please enter your password"),
    // userProfile:YUP.file().required("Please choose your profile."),
    cpassword:YUP.string().required().oneOf([YUP.ref("password"), null], "Password must be the same.")
})