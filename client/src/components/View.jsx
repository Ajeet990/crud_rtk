import React from 'react'
import { useFindUserByIdQuery } from '../services/userApi'
import { Link, useParams } from 'react-router-dom'

const View = () => {
    const {id} = useParams()
    // console.log("view ",id)
    const userById = useFindUserByIdQuery(id)
    // console.log(userById)
    // console.log(userById.data.data[0].name)
    if (userById.isLoading) return <div>Loading user Detail...</div>

    return (
        <div className='container bg-info'>
            <span>Name : {userById.data.data[0].name}</span><br />
            <span>User Name : {userById.data.data[0].user_name}</span><br />
            <span>Email address : {userById.data.data[0].email}</span><br />
            <span>Physical address : {userById.data.data[0].address}</span><br />
            <Link className='btn btn-sm btn-success' to={'/'}>Go Back</Link>
        </div>
    )
}

export default View