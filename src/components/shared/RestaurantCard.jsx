import React, { useEffect, useState } from "react";
import "./card.css";
import { useAppContext } from "../../Context/Context";

const RestaurantCard = ({ image, name, price, addons, isSelected, onSelect, onShowAddBillingModal}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState({});
  const [discount, setDiscount] = useState(0); // Discount state
  const { activeIcon } = useAppContext()

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
    console.log("Added to Billing:", { name, price, discount, selectedAddons });
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
            
            <img src={image} alt={name} className="card-img-top" />
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
      

      {/* <div className="card p-2 restaurant-card" onClick={handleCardClick}>
        <img src={image} alt={name} className="card-img-top" />
        <div className="card-body text-left">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">${price.toFixed(2)}</p>
        </div>
      </div> */}

      {/* Modal */}
      {showModal && onShowAddBillingModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Display Image in Modal */}
            <img src={image} alt={name} className="modal-img" />
            <h4>{name}</h4>

            {/* Price and Discount Section */}
            <p>Original Price: <strong>${price.toFixed(2)}</strong></p>
            <label>
              Discount ($):
              <input 
                type="number" 
                value={discount} 
                onChange={handleDiscountChange} 
                className="discount-input"
                min="0"
              />
            </label>
            <p><strong>Final Price: ${finalPrice}</strong></p>

            {/* Add-ons Section */}
            
            {addons && Array.isArray(addons) && addons.length > 0 && (
              <div className="addons-container">
                {addons.map((addon, idx) => (
                  <div key={idx} className="addon-category">
                    <h6>{addon.name}</h6>
                    {addon.options.map((option, i) => (
                      <label key={i} className="addon-option">
                        <input
                          type={addon.checkbox ? "checkbox" : "radio"}
                          name={addon.name}
                          value={option}
                          checked={selectedAddons[addon.name]?.includes(option)}
                          onChange={() => handleAddonChange(addon.name, option, addon.checkbox)}
                        />
                        {option}
                      </label>
                    ))}
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
