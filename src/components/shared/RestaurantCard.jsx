import React, { useEffect, useState } from "react";
import "./card.css";
import { useAppContext } from "../../Context/Context";
import { useAuth } from "../../Context/AuthContext";
import { useCartContext } from "../../Context/cartContext";
import axios from "axios";
import ProductModal from "./ProductModal";

const RestaurantCard = ({ item_id, item, image, name, price, addons, isSelected, onSelect, onShowAddBillingModal, onShowInventoryManagementModal}) => {
  const [showModal, setShowModal] = useState(false);
  const { token } = useAuth();
  const [selectedAddons, setSelectedAddons] = useState({});
  const [discount, setDiscount] = useState(0); // Discount state
  const { activeIcon } = useAppContext()
  const {cart, handleCartActions}=useCartContext();

  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] = useState(true);

  const [showModal2, setShowModal2] = useState(false);



  useEffect(() => {
    const fetchImage = async () => {
      try {
        setLoading(true); // start loading
        const response = await axios.get(
          `http://localhost:8080/api/item/${item_id}/image`,
          {
            responseType: "blob",
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setImageUrl(URL.createObjectURL(response.data));
        item.imageUrl=imageUrl;
      } catch (error) {
        console.error("Error fetching image:", error);
      } finally {
        setLoading(false); // stop loading
      }
    };
  
    if (item_id) {
      fetchImage();
    }
  }, [item_id]);
  

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setShowModal(false);
  };

  const handleAddonChange = (category, option, checkbox) => {
    setSelectedAddons((prev) => {
      const currentAddons = prev[category] || [];
      // debugger
      if (checkbox) {
        if (currentAddons.includes(option)) {
          return {
            ...prev,
            [category]: currentAddons.filter((item) => item !== option),
          };
        } else {
          return {
            ...prev,
            [category]: [...currentAddons, option],
          };
        }
      } else {
        return {
          ...prev,
          [category]: [option],
        };
      }
    });
  };

  const handleAddToBillingClick = () => {
    item.imageUrl = imageUrl
    handleCartActions("addToCart",item, 1, discount)
    setShowModal(false);
  };

  const handleDiscountChange = (e) => {
    let value = parseFloat(e.target.value);
    if (isNaN(value) || value < 0) value = 0; // Prevent negative discount
    setDiscount(value);
  };

  const finalPrice = Math.max(price - discount, 0).toFixed(2); // Ensure price never goes negative

  return (
    <>
      {/* Card */}
      <div className="card p-2 restaurant-card">
      <div className="" onClick={handleCardClick}>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <img src={imageUrl} alt={name} className="card-img-top" />
          )}

          <div className="card-body text-left">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">${price?.toFixed(2)}</p>
          </div>
        </div>


          {activeIcon =='inventory'?(<>
            <div className="d-flex justify-content-end"
              style={{ }}>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                      e.stopPropagation();
                      onSelect();
                    }}
                    style={{ width: "20px", height: "20px" }}
                  />
            </div>
          </>):(<></>)  
           }
      </div>
     
      {showModal && onShowInventoryManagementModal &&(
        // selectedItem={selectedItem2} 
        <ProductModal imageUrl={imageUrl} selectedItem={item} showModal={showModal} type="edit" onClose={() => setShowModal(false)} />
      )}

      {/* Modal */}
      {showModal && onShowAddBillingModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Display Image in Modal */}
            <img src={imageUrl} alt={name} className="modal-img" />
            <h4>{name}</h4>

            {/* Price and Discount Section */}
            <p>Original Price: <strong>${price.toFixed(2)}</strong></p>
            <hr className=""/>
            {/* <label>
              Discount ($):
              <input 
                type="number" 
                value={discount} 
                onChange={handleDiscountChange} 
                className="discount-input"
                min="0"
              />
            </label>
            <p><strong>Final Price: ${finalPrice}</strong></p> */}

            {/* Add-ons Section */}
            
            {addons && Array.isArray(addons) && addons.length > 0 && (
              <div className="d-block justify-content-start  gap-3 p-2 addons-container">
                {addons.map((addon, idx) => (
                  <div key={idx} className="addon-category">
                    <h6>{addon.name}</h6>
                    {addon.options.map((option, i) => (
                      <label key={i}  


                      className={`addon-option ${ addon.checkbox ? "" : "isRadio"
                      }`}
                      >


                        <input
                          type={addon.checkbox ? "checkbox" : "radio"}
                          name={addon.name}
                          value={option}
                          
                          checked={selectedAddons[addon.name]?.includes(option)}
                          onChange={() => handleAddonChange(addon.name, option, addon.checkbox)}
                        />
                        {option}
                          {option.price&&(<>
                            &nbsp;($26)
                          </>)}
                          
                      </label>
                      
                    ))}

                  <hr className=""/>
                  </div>
                ))}
              </div>
            )}

            {/* Modal Actions */}
            <div className="modal-actions">
              <button className="btn btn-danger" onClick={handleCloseModal}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAddToBillingClick}>Add to Billing</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantCard;
