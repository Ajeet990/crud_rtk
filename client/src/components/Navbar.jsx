import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../Authorization/Auth'


const Navbar = () => {
    const auth = useAuth()
    const userEmail = auth.user
    const navigate = useNavigate()
    const handleLogOut = () => {
        auth.logout()
        localStorage.removeItem('user_token')
        navigate('/login')
    }
    // console.log("this", auth)
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink to={'/'} className="navbar-brand">Dashboard</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" to={'/home'} aria-current="page">Home</NavLink>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            {
                                !userEmail && (<li className='nav-item'>
                                <NavLink className="nav-link" to={'/login'}>Log-In</NavLink>
                            </li>)
                            }

                            {
                                auth.user && (
                                    <li className="nav-item"><span className='text-light nav-link'>
                                        Welcome : {auth.user.username}
                                    </span></li>
                                )
                            }

                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        {
                            auth.user && (
                                <div className="dropdown ms-1">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {auth.user.username}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <NavLink className="dropdown-item" to={`view/${auth.user.userId}`}>Profile</NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="dropdown-item" onClick={handleLogOut}>Log-Out</NavLink>
                                        </li>
                                    </ul>
                                </div>
                            )
                        }

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar