import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useValidateOTPMutation } from '../services/userApi'
import { toast } from 'react-toastify'


const SendMail = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [checkOTP] = useValidateOTPMutation()
    const data = location.state
    const [otp, setOtp] = useState('')

    const submitOTP = async (e) => {
        e.preventDefault()
        // console.log(otp)
        const otpRst = await checkOTP({otp:otp, email:data.email})
        if (otpRst.data.success) {
            toast.success("OTP verified. Please login using your credentials.")
            navigate('/login')
        } else {
            toast.error("Wrong OTP. Please re-enter.")
        }
    }

    return (
        <div className='container my-2'>
            <div className="alert alert-primary my-1" role="alert">
                Please enter OTP sent to registered email "{data.email}"
            </div>
            <div>
                <input type="number" onChange={(e)=>setOtp(e.target.value)} placeholder='Enter OTP' />
                <input type='submit' onClick={submitOTP}/>
            </div>

        </div>
    )
}

export default SendMail