// AppContext.js
import React, { useState, useEffect, createContext , useContext} from "react";
import { useAuth } from "../Context/AuthContext";
import axios from "../axios"; // make sure this has baseURL configured

const AppContext = createContext({
  data: [],
  isError: "",
  refreshData: () => {},
  activeIcon:"",
  handleSetActiveIcon:()=>{
  },
});


export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const { token } = useAuth();
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState("");
  const [activeIcon, setActiveIcon]= useState(localStorage.getItem("active_tab") || "home")




  const refreshData = async () => {
    try {
      setData([]);
      const response = await axios.get("http://localhost:8080/api/items", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setData(response.data);
      // alert("Ok refreshClick")
      setIsError("");
    } catch (error) {
      setIsError("Failed to fetch items");
    }
  };

  const handleSetActiveIcon=(activeIconStr)=>{
    window.localStorage.setItem("active_tab", activeIconStr);
    setActiveIcon(activeIconStr)
  }

  // 

  useEffect(() => {
    if (activeIcon) {
      // alert(activeIcon);
    }
  }, [activeIcon]);



  useEffect(() => {
    if (token) {

      
      refreshData();
    }
  }, [token]);

  return (
    <AppContext.Provider value={{ data, isError, refreshData, activeIcon,handleSetActiveIcon }}>
      {children}
    </AppContext.Provider>
  );
};
