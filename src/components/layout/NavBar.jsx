import React from 'react'
import "./navbar.scss";
import {useAuth} from '../../Context/AuthContext'

const NavBar = () => {
    const { user } = useAuth();
  return (
    <div className="nav container-fluid">
        <div className=" d-flex justify-content-center  align-items-center w-100">

            {/* logo */}
            {/* <div className="logo">
                <img src="https://logo.com/image-cdn/images/kts928pd/production/9b98774a34ba33e8298f12960875c0796b7b0a66-900x550.png?w=1920&q=72&fm=webp"
                style={{margin: "2.2 2.1rem", widows:"10px", height:"auto"}}
                 alt="logo" />
            </div> */}

            {/* Remaining content */}
            {/* <div className="search-input d-flex justify-content-between align-items-center">
                <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-search"></i></span>
                    <input type="text" className="form-control input-style " placeholder="Search menu..." />
                </div>
            </div> */}

            <div className="d-flex justify-content-between align-items-center gap-4 m-4">
                 <span className="d-flex justify-content-between align-items-center">Welcome, {user?.firstname}!</span>
                <i className="bi bi-person-circle"></i>
                <span className="tooltip">User Profile</span>
            </div>
        </div>
    </div>
  )
}

export default NavBar