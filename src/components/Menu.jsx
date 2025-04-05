import React, { useState, useEffect } from "react";
import {
  FaIceCream,
  FaCoffee,
  FaHamburger,
  FaAppleAlt,
  FaLeaf,
} from "react-icons/fa";
import { Navigate } from "react-router-dom"; // ✅ Added missing import
import "./menu.scss";
import RestaurantCard from "../components/shared/RestaurantCard";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

const data=[
  {
      "id": 1,
      "image": "https://www.recipetineats.com/tachyon/2017/05/Chicken-Noodle-Soup-from-scratch_3.jpg",
      "name": "Chicken Noodle Soup",
      "price": 9.99,
      "category": "Soup",
      "addons": [
          {
              "name": "Extras",
              "options": [
                  "Extra Noodles",
                  "Extra Chicken"
              ],
              "checkbox": false
          },
          {
              "name": "Spicy",
              "options": [
                  "Hot",
                  "Medium"
              ],
              "checkbox": true
          }
      ],
      "releaseDate": null,
      "imageName": null,
      "imageType": null,
      "imageData": null,
      "available": false
  },
  {
      "id": 2,
      "image": "https://www.thespruceeats.com/thmb/lko3xX8clhOrC894t9Drb6MoiX0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/easy-and-hearty-vegetable-soup-99538-hero-01-1d3b936ff03144af95ddca7640259c11.jpg",
      "name": "Cheeseburger",
      "price": 7.99,
      "category": "Snack",
      "addons": [
          {
              "name": "Extras",
              "options": [
                  "Extra Cheese",
                  "Bacon"
              ],
              "checkbox": false
          },
          {
              "name": "Spicy",
              "options": [
                  "Mild",
                  "Spicy"
              ],
              "checkbox": true
          }
      ],
      "releaseDate": null,
      "imageName": null,
      "imageType": null,
      "imageData": null,
      "available": false
  },
  {
      "id": 3,
      "image": "https://www.whiskaffair.com/wp-content/uploads/2016/08/Clear-Chicken-Soup-2-3.jpg",
      "name": "Iced Coffee",
      "price": 3.99,
      "category": "Coffee",
      "addons": [
          {
              "name": "Milk Options",
              "options": [
                  "Almond",
                  "Oat"
              ],
              "checkbox": false
          },
          {
              "name": "Sweetness",
              "options": [
                  "Regular",
                  "Less Sugar"
              ],
              "checkbox": true
          }
      ],
      "releaseDate": null,
      "imageName": null,
      "imageType": null,
      "imageData": null,
      "available": false
  },
  {
      "id": 4,
      "image": "https://www.indianhealthyrecipes.com/wp-content/uploads/2019/06/vegetable-soup.jpg",
      "name": "Hot Chocolate",
      "price": 4.49,
      "category": "Dessert",
      "addons": [
          {
              "name": "Toppings",
              "options": [
                  "Marshmallows",
                  "Whipped Cream"
              ],
              "checkbox": true
          }
      ],
      "releaseDate": null,
      "imageName": null,
      "imageType": null,
      "imageData": null,
      "available": false
  },
  {
      "id": 5,
      "image": "https://static01.nyt.com/images/2025/01/23/multimedia/as-miso-parmesan-kvml/as-miso-parmesan-kvml-mediumSquareAt3X.jpg",
      "name": "Ice Cream Sandwich",
      "price": 2.99,
      "category": "Ice Cream",
      "addons": [
          {
              "name": "Flavors",
              "options": [
                  "Vanilla",
                  "Chocolate"
              ],
              "checkbox": false
          }
      ],
      "releaseDate": null,
      "imageName": null,
      "imageType": null,
      "imageData": null,
      "available": false
  },
  {
      "id": 6,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMahNoywjXZTEG-LpFjxLR1PUsuE6CpQ4_qQ&s",
      "name": "Caesar Salad",
      "price": 8.49,
      "category": "Salad",
      "addons": [
          {
              "name": "Extras",
              "options": [
                  "Grilled Chicken",
                  "Extra Croutons"
              ],
              "checkbox": false
          }
      ],
      "releaseDate": null,
      "imageName": null,
      "imageType": null,
      "imageData": null,
      "available": false
  },
  {
      "id": 7,
      "image": "https://images.getrecipekit.com/20241001155039-untitled-20-10.png?aspect_ratio=16:9&quality=90&",
      "name": "Pepperoni Pizza",
      "price": 12.99,
      "category": "Popular",
      "addons": [
          {
              "name": "Toppings",
              "options": [
                  "Extra Cheese",
                  "Olives"
              ],
              "checkbox": true
          },
          {
              "name": "Crust",
              "options": [
                  "Thin",
                  "Thick"
              ],
              "checkbox": false
          }
      ],
      "releaseDate": null,
      "imageName": null,
      "imageType": null,
      "imageData": null,
      "available": false
  }
]



function Menu() {
  const [category, setCategory] = useState("Popular");
  const { token } = useAuth();
  const [restaurantData, setRestaurantData] = useState(data); // ✅ Use correct setter function
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
      }
    };
    if (token) fetchItems();
  }, [token]);

  // if (!token) {
  //   return <Navigate to="/" />;
  // }

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
              {cat === "Popular" && <FaHamburger size={24} />}
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
