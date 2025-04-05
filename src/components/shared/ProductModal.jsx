import React, {useState} from 'react'
import "./productModal.css"
const ProductModal = ({ data, type }) => {

    const handleCloseModal = (e) => {
        e.stopPropagation();
      };


  return (
    <div className="inventory-modal-overlay">
       
        <div className="inventory-modal-content" onClick={(e) => e.stopPropagation()}>
        {type == "add" ? (<>
               <div>Add</div>
        </>) : (<><div>no</div></>)
        
        }
        </div>
    </div>
  )
}

export default ProductModal