import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";
import "./home.css"
import SideNav from "./layout/SideNav";
import Menu from "./Menu";
import NavBar from  "./layout/NavBar";
import ItemManagement from "./ItemManagement";
import Billing from "./Billing"
import { useAppContext } from "../Context/Context";



const Home = () => {
  const { token, logout } = useAuth();

  const { activeIcon } = useAppContext();

 
  

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
    }
  };

  
  return <div className="container-fluid">
      <NavBar />
        <br />
       <div className="row">
       {/* <!-- Sidebar Content--> */}
        <div className="col-md-1 sidebar">
          <SideNav/>
        </div>
        {/*<!-- Menu Content --> */}

        {activeIcon =='home'? (<> <div className="col-md-7 px-4 menu">
          <Menu />
        </div>
        <div className="col-md-3 ">
          <Billing />
        </div></>) :(<></>)
        }
        {/*<!-- Inventory Content --> */}
        {activeIcon =='inventory'? (<>
          <div  className="col-md-10 px-4 inventory-class">
          <ItemManagement />
          </div>
        </>):(<></>)
        }

        
       </div>
    </div>

  // ) : (
  //   <Navigate to="/" />
  // );
};

export default Home;