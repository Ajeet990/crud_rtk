import React, {useEffect} from 'react'
import {toast} from 'react-toastify'
import { useGetAllUserListQuery, useDeleteUserMutation } from '../services/userApi'
import { Link } from 'react-router-dom'
const Home = () => {
    const userResponse = useGetAllUserListQuery()
    const [deleteUser] = useDeleteUserMutation()
    useEffect(() => {
        if (userResponse.isSuccess) {
            toast.success("Data loaded successfully.")
        }
    }, [userResponse])
    // console.log("data is", userList)
    const handleDelete = async (userId) => {
        // console.log("delete", userId)
        confirm("Are you sure want to delete?")
        const deleteRst = await deleteUser(userId)
        if (deleteRst.data.success) {
            toast.success("User deleted successfully.")
        }
    }
    if (userResponse.isLoading) return <div>Please Wait Data Loading...</div>

    return (
        <div>
            <h1>Welcome to my Crud Application</h1>
            <Link to="addUser" className='btn btn-primary'>Add User</Link>
            {
                userResponse.isSuccess && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">User name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Address</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userResponse.data.data.map((user, index) => {
                                    return (
                                        <tr key={user.id}>
                                            <th scope="row">{index+1}</th>
                                            <td>{user.name}</td>
                                            <td>{user.user_name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.address}</td>
                                            <td>
                                                <Link to={`/update/${user.id}`} className='btn btn-sm btn-info'>Edit</Link>
                                                <button onClick={() => handleDelete(user.id)} className='btn btn-sm btn-danger mx-1'>Delete</button>
                                                <Link to={`/view/${user.id}`} className='btn btn-sm btn-info'>View</Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                )
            }

        </div>
    )
}

export default Home