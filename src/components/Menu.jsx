import React, { useState, useEffect } from "react";
import {
  FaIceCream,
  FaCoffee,
  FaHamburger,
  FaAppleAlt,
  FaLeaf,
  FaFire,
} from "react-icons/fa";
import { Navigate } from "react-router-dom"; // ✅ Added missing import
import "./menu.scss";
import RestaurantCard from "../components/shared/RestaurantCard";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";



function Menu() {
  const [category, setCategory] = useState("Popular");
  const { token } = useAuth();
  const [restaurantData, setRestaurantData] = useState([]); // ✅ Use correct setter function
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(true);

  const [activeIcon, setActiveIcon] = useState(localStorage.getItem("ACTIVEROUTE") || "home");
  



  useEffect(() => {
    const fetchItems = async () => {
      try {

        
        const response = await axios.get("http://localhost:8080/api/items", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setRestaurantData(response.data);
        // localStorage.setItem("DATA",JSON.stringify(restaurantData));
        setIsSending(false);

        


      } catch (error) {
        setIsSending(false);
        // window.localStorage.removeItem("DATA")
        setError("Failed to fetch items");
        setRestaurantData([])
      }
    };
    if (token) fetchItems();
  }, [token]);

  if (!token) {
    return <Navigate to="/" />;
  }

  const handleClickManageItemMenu = (manageInventory) => {
    setIsManageInventory(manageInventory)
  }

  const handleCategoryClick = (categoryName) => {
    setCategory(categoryName);
  };

  // Ensure `restaurantData` is an array before filtering
  const filteredItems = Array.isArray(restaurantData)
    ? restaurantData.filter(
        (item) => category === "Popular" || item.category === category
      )
    : [];
  return (
    <div className="">
      <div>
      <div className="p-2">
            <h1 className="text-2xl font-bold">Menus</h1>
          </div>
        <h5 className="p-2">Choose Category</h5>
        <div className="p-2 d-flex gap-2">
          {[
            "Popular",
            "Ice Cream",
            "Coffee",
            "Snack",
            "Dessert",
            "Salad",
            "Soup",
          ].map((cat) => (
            <button
              key={cat}
              className={`category-btn ${category === cat ? "active" : ""}`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat === "Ice Cream" && <FaIceCream size={24} />}
              {cat === "Coffee" && <FaCoffee size={24} />}
              {cat === "Snack" && <FaHamburger size={24} />}
              {cat === "Dessert" && <FaAppleAlt size={24} />}
              {cat === "Salad" && <FaLeaf size={24} />}
              {cat === "Soup" && <FaAppleAlt size={24} />}
              {cat === "Popular" && <FaFire size={24} />}
              {cat}
            </button>
          ))}
        </div>
  
        {/* Filtered Cards */}
        <div className="p-2 d-flex gap-2 flex-wrap card-menu">
          {error && <p className="text-red-500">{error}</p>}
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <RestaurantCard
                item_id={item.id}
                key={index}
                item={item}
                image={item.image}
                name={item.name}
                price={item.price}
                addons={item.addons}
                isMenuActive={true}
                onShowAddBillingModal={true}
              />
            ))
          ) : (
            <p>{isSending ? "Loading..." : " No item found.."}</p>
            
          )}
         
        </div>
      </div>
    </div>
  );
}

export default Menu;
