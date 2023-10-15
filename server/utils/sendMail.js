import nodemailer from 'nodemailer'

export const sendMail = async (req, res) => {
    // console.log("yes sendmail",req.body.otp, req.body.email)
    const otp = req.body.otp
    const email = req.body.email
    let testAccount = await nodemailer.createTestAccount()
    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
        service:process.env.SERVICE,
        auth:{
            user:process.env.FROM,
            pass:process.env.APP_PASSWORD
        }
    });

    let info = await transporter.sendMail({
        from:process.env.FROM,
        to:email,
        subject:"Register OTP",
        // text:"your otp is<b>1145461</b>",
        html:`Please login using this OTP : <b>${otp}</b>\n
        From:<span>AJ consultant institute</span>\n
        Connect:<span>ajeettharu0@gmail.com || +91 8105982990</span>\n
        <img src"cid:logo123" width="200px" alt="Company logo" />`,
        attachments:[{
            filename:"cmp.jpg",
            path:"../../CRUD_RTK/client/public/upload/companyLogo/cmp.jpg",
            cid:"logo123"
        }]
    })
    // console.log("message info", info)
    if (info.accepted.length > 0) {
        res.status(200).json({success:true, message:"mail sent"})
    } else {
        res.status(404).json({success:false, message:"mail not sent"})
    }
}