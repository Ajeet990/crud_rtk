import { useEffect, useState } from 'react'
import { useAddUserMutation, useUploadImageMutation } from '../services/userApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useSendOtpToMailAddressMutation } from '../services/userApi'
// import SendMail from '../SendMailSystem/SendMail'
import { useFormik } from 'formik'
import { addNewUserSchema } from '../schemas/AddUserSchema'


const initialValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    cpassword: "",
    address: "",
}

const AddUser = () => {
    // const [editMode, setEditMode] = useState(false)
    const [profile, setProfile] = useState('')
    const [addUser] = useAddUserMutation()
    const [upload] = useUploadImageMutation()
    const [sendMailToNewUser] = useSendOtpToMailAddressMutation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: addNewUserSchema,
        onSubmit: async (values) => {
            if (!profile) {
                toast.warning("Profile rquired.")
            } else {
                setLoading(true)
                const photoUploadRst = await upload(profile)
                if (photoUploadRst.data) {
                    const otp = Math.floor(100000 + Math.random() * 900000)
                    values.profile_pic = photoUploadRst.data
                    values.otp = otp
                    console.log(values)

                    const data = { email: values.email, otp: otp }
                    const sendOtprst = await sendMailToNewUser(data)
                    const registerRst = await addUser(values)

                    if (registerRst.data.success && sendOtprst.data.success) {
                        toast.success("OTP sent to registered email.")
                        navigate("/sendMail", { state: data })
                    } else {
                        toast.error(registerRst.data.message + ":" + sendOtprst.data.message)
                    }
                }
            }
        }
    })


    return (
        <div className='container bg-info my-1 col-lg-5' align="center">
            <h1>Add new user to the crew.</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label text-center">Name</label>
                    <input type="text" value={values.name} onChange={handleChange} onBlur={handleBlur} name="name" className="form-control" id="name" />
                    {errors.name && touched.name ? (
                        <span className='addUserFormErrorMsg'>{errors.name}</span>) : null
                    }
                </div>
                <div className="mb-3">
                    <label className="form-label">User Name</label>
                    <input type="text" value={values.username} onChange={handleChange} onBlur={handleBlur} className="form-control" name='username' id="username" />
                    {errors.username && touched.username ? (
                        <span className='addUserFormErrorMsg'>{errors.username}</span>) : null
                    }
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="text" value={values.email} onChange={handleChange} onBlur={handleBlur} className="form-control" name='email' id="email" />
                    {errors.email && touched.email ? (
                        <span className='addUserFormErrorMsg'>{errors.email}</span>) : null
                    }
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} className="form-control" name='password' id="password" />
                    {errors.password && touched.password ? (
                        <span className='addUserFormErrorMsg'>{errors.password}</span>) : null
                    }
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" value={values.cpassword} onChange={handleChange} onBlur={handleBlur} className="form-control" name='cpassword' id="cpassword" />
                    {errors.cpassword && touched.cpassword ? (
                        <span className='addUserFormErrorMsg'>{errors.cpassword}</span>) : null
                    }
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" value={values.address} onChange={handleChange} onBlur={handleBlur} className="form-control" name='address' id="address" />
                    {errors.address && touched.address ? (
                        <span className='addUserFormErrorMsg'>{errors.address}</span>) : null
                    }
                </div>
                <div className="mb-3">
                    <label className="form-label">Profile image</label>
                    <input type="file" onChange={(e) => setProfile(e.target.files[0])} className="form-control" name='userProfile' id="profile" />
                </div>

                <input type="submit" className="btn btn-primary my-2" value={"Add user"} />
                {
                    loading && (<><div className="spinner-border text-dark" role="status"></div>
                        <span>Please wait. Sending mail... </span>
                    </>)
                }

            </form>
        </div>
    )
}

export default AddUser