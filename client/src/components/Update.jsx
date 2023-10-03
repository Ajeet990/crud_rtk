import {useEffect, useState} from 'react'
import { useAddUserMutation } from '../services/userApi'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useFindUserByIdQuery, useUpdateUserMutation } from '../services/userApi'

const Update = () => {
    const [name, setName] = useState('')
    const [uname, setUName] = useState('')

    const {id} = useParams()
    const navigate = useNavigate()
    const userDetail = useFindUserByIdQuery(id)
    const [updateUser] = useUpdateUserMutation()
    const [inputs, setInputs] = useState({})
    if (userDetail.isLoading) return <div>Data loading...</div>

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(inputs)
        // console.log("n", e.target.name.value)
        // console.log("un", e.target.username.value)
        var userId = id
        var name = e.target.name.value
        var user_name = e.target.username.value
        var email = e.target.email.value
        var address = e.target.address.value
        if (!name || !user_name || !email || !address) {
            toast.warning("All fields are required.")
        } else {
            // console.log({userId, name, user_name, email, address})
            const updateRst = await updateUser({userId, name, user_name, email, address})
            if (updateRst.data.success) {
                toast.success("User updated successfully.")
                navigate('/')
            } else {
                toast.error("Something went wrong.")
                // navigate('/')
            }
        }

    }
    const handleChange = (e) => {
        setInputs({...inputs, [e.target.name]:e.target.value })
        // console.log(inputs)
    }

    return (
        <div className='container bg-info'>
            <h1>Update user Details.</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" defaultValue={userDetail.data.data[0].name} onChange={(e) => setName(e.target.value)} name="name" className="form-control" id="name" />
                </div>
                <div className="mb-3">
                    <label className="form-label">User Name</label>
                    <input type="text" defaultValue={userDetail.data.data[0].user_name} onChange={(e) => setUName(e.target.value)} className="form-control" name='username' id="username" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="text" defaultValue={userDetail.data.data[0].email} onChange={handleChange} className="form-control" name='email' id="email" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" defaultValue={userDetail.data.data[0].address} onChange={handleChange} className="form-control" name='address' id="address" />
                </div>
                
                <input type="submit" className="btn btn-primary my-2" value={"Update user"}/>
                <Link className='btn btn-success mx-1' to={'/'}>Go back</Link>
            </form>
        </div>
    )
}

export default Update