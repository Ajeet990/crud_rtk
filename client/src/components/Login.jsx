import React from 'react'
import { useAuth } from '../Authorization/Auth'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useLoginUserMutation } from '../services/userApi'

const Login = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [makeUserLogin] = useLoginUserMutation()
    const redirectPath = location.state?.path || '/'
    const auth = useAuth()
    const [userEmail, setUserEmail] = useState('')
    const [userPass, setUserPass] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!userEmail|| !userPass) {
            toast.warning("All fields are required.")
        } else {
            const loginRst = await makeUserLogin({userEmail:userEmail, userPassword:userPass})
            if (loginRst.data.success) {
                auth.login(userEmail)
                localStorage.setItem("user_token",loginRst.data.data.token)
                navigate(redirectPath, {replace:true})
            } else {
                toast.error(loginRst.data.message)
            }
        }
    }

    return (
        <div className='container bg-info my-1 col-lg-5'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name='user_email' onChange={(e)=>{setUserEmail(e.target.value)}} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='user_pass' onChange={(e)=>{setUserPass(e.target.value)}} className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Log In</button>
            </form>
        </div>
    )
}

export default Login