import React from 'react'
import "./navbar.scss";
import {useAuth} from '../../Context/AuthContext'

const NavBar = () => {
    const { user } = useAuth();
  return (
    <div className="nav container-fluid">
        <div className=" d-flex w-100">

            {/* logo */}
            <div className="logo">
                <img src="https://psdstamps.com/wp-content/uploads/2022/04/test-stamp-png.png"
                style={{margin: "0 2.1rem"}}
                 alt="logo" />
            </div>

            {/* Remaining content */}
            <div className="search-input d-flex justify-content-between align-items-center">
                {/* Search bar */}
                <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-search"></i></span>
                    <input type="text" className="form-control search-input" style={{width:"750px"}} placeholder="Search menu..." />
                </div>
            </div>

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