import React from 'react'
import { useFindUserByIdQuery } from '../services/userApi'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineRollback } from "react-icons/ai";


const View = () => {
    const { id } = useParams()
    const userById = useFindUserByIdQuery(id)
    console.log(userById)
    if (userById.isLoading) return <div>Loading user Detail...</div>
    var imagePath = "http://localhost:5173/upload/userProfiles/default.jpg"
    if (userById.data.data[0].profile_pic != '') {
        imagePath = "http://localhost:5173/upload/userProfiles/"+userById.data.data[0].profile_pic
    }

    return (
        <div className='container bg-info'>
            <div className='row'>
                <div className='col-md-8'>
                    <span>Name : {userById.data.data[0].name}</span><br />
                    <span>User Name : {userById.data.data[0].user_name}</span><br />
                    <span>Email address : {userById.data.data[0].email}</span><br />
                    <span>Physical address : {userById.data.data[0].address}</span><br />
                </div>
                <div className='col-md-4'>
                    <span><img src={imagePath} width='50%' alt="" /></span>
                </div>
            </div>
            <Link className='btn btn-sm btn-success' to={'/'}>Go Back <AiOutlineRollback/></Link>
        </div>
    )
}

export default View