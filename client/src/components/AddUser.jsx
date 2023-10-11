import { useEffect, useState } from 'react'
import { useAddUserMutation, useUploadImageMutation } from '../services/userApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

const AddUser = () => {
    // const [editMode, setEditMode] = useState(false)
    const [profile, setProfile] = useState('')
    const [addUser] = useAddUserMutation()
    const [upload] = useUploadImageMutation()
    const navigate = useNavigate()
    const { id } = useParams()
    const [inputs, setInputs] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!inputs.name || !inputs.username || !inputs.email || !inputs.password || !inputs.address || !profile) {
            toast.warning("All fields are required.")
        } else {
            const photoUploadRst = await upload(profile)
            if (photoUploadRst.data) {
                inputs.profile_pic = photoUploadRst.data
                const registerRst = await addUser(inputs)
                if (registerRst.data.success) {
                    toast.success("User registered successfully.")
                    navigate("/")
                } else {
                    toast.error(registerRst.data.message)
                }

            }
        }
    }
    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
        // console.log(inputs)
    }

    return (
        <div className='container bg-info my-1 col-lg-5' align="center">
            <h1>Add new user to the crew.</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label text-center">Name</label>
                    <input type="text" value={inputs.name || ''} onChange={handleChange} name="name" className="form-control" id="name" />
                </div>
                <div className="mb-3">
                    <label className="form-label">User Name</label>
                    <input type="text" value={inputs.username || ''} onChange={handleChange} className="form-control" name='username' id="username" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="text" value={inputs.email || ''} onChange={handleChange} className="form-control" name='email' id="email" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" value={inputs.password || ''} onChange={handleChange} className="form-control" name='password' id="password" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" value={inputs.address || ''} onChange={handleChange} className="form-control" name='address' id="address" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Profile image</label>
                    <input type="file" onChange={(e) => setProfile(e.target.files[0])} className="form-control" name='file' id="profile" />
                </div>

                <input type="submit" className="btn btn-primary my-2" value={"Add user"} />
            </form>
        </div>
    )
}

export default AddUser