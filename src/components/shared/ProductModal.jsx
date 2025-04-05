import React, { useEffect, useState } from 'react';
import { Plus, Upload, Edit, RotateCcw, Delete, ChevronDown } from 'lucide-react';
import './productModal.css';

const ProductModal = ({ selectedItem, showModal, type, onClose }) => {
  const [hasData, setHasData] = useState(selectedItem || false);
  const [addAddOn, setAddAddOn] = useState(false)
  // const [openAddOnModal]
  const [product, setProduct] = useState(
    selectedItem || {
      name: '',
      price: '',
      category: '',
      addons: [{}],
      releaseDate: '',
    }
  );

  useEffect(()=>{
  },[product])

  const [image, setImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleAddonNameChange = (e, index) => {
    const { value } = e.target;
    const newAddons = [...product.addons];
    newAddons[index] = { ...newAddons[index], name: value };
    setProduct({ ...product, addons: newAddons });
  };

  const handleAddonValuesChange = (e, index) => {
    const { value } = e.target;
    const newAddons = [...product.addons];
    newAddons[index] = { ...newAddons[index], options: value.split(',').map((item) => item.trim()) };
    setProduct({ ...product, addons: newAddons });
  };

  const handleCheckboxChange = (e, index) => {
    const { checked } = e.target;
    const newAddons = [...product.addons];
    
    newAddons[index] = { ...newAddons[index], checkbox: checked }; // Update the isChecked state for that addon
    setProduct({ ...product, addons: newAddons });

  };

  const handleCloseModal = (e) => {
    e.stopPropagation();
    onClose();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImage(URL.createObjectURL(file));
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
    }
  };

  const viewAddon = () => {
    setAddAddOn(true);
  };

  const addMoreAddon = () => {
    
    setProduct({
      ...product,
      addons: [...product.addons, {}], // Add a new empty add-on
    });
  };

  const closeModalAddOn = () => {
    // setAddAddOn(false);
  };

  if (!showModal) return null;

  return (
    <div className="inventory-modal-overlay" onClick={handleCloseModal}>
      <div
        className="inventory-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{type === 'edit' ? 'Edit Menu' : 'Menu Information'}</h2>
       
        <div className=" center-container d-flex justify-content-start align-items-start p-4">
          
          {/* Drag & Drop Image Upload */}
          <div>
          <div
            className={`drop-zone d-flex justify-content-between align-items-center ${dragActive ? 'active' : ''}`}
            onDragOver={handleDragOver}
            style={{ width: "20%" }}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {image ? (
              <img src={image} alt="Preview" className="preview-image" />
            ) : (
              <p>Drag & Drop Image Here or Click to Upload</p>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
          </div>
          {image && <p className="d-bleck preview-image" style={{ width: "200px", margin: "0", padding:"0"}}>Click the image to change.</p>}
          </div>

          {/* Input Fields */}
          <div className="input-fields p-0" style={{ width: "60%" }}>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              placeholder="Menu Name"
              className="input-style"
            />
            <input
              type="text"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="input-style"
            />
            <div className="select-wrapper">
              <select
                name="category"
                value={product.category}
                onChange={handleInputChange}
                className="custom-select"
              >
                <option value="">Select Category</option>
                <option value="Popular">Popular</option>
                <option value="Ice cream">Ice cream</option>
                <option value="Coffe">Coffe</option>
                <option value="Snack">Snack</option>
                <option value="Dessert">Dessert</option>
                <option value="Salad">Salad</option>
                <option value="Soap">Soap</option>
              </select>
              <ChevronDown className="select-icon" size={20} />
            </div>

            <input
              type="date"
              name="releaseDate"
              value={product.releaseDate}
              onChange={handleInputChange}
              placeholder="Release Date"
              className="input-style"
            />

            {/* Add-ons Section */}
            <div className="addons-section">
            {/* addAddon */}
            <button onClick={viewAddon} className="btn-add-addon">
                View Add-ons</button>
              {addAddOn &&(
                <>
                <div className='add-on-overlay' onClick={closeModalAddOn}>
                  <div className='add-on-content'>
                  <div>Enter Add Ons</div>
                  <div className="addon-section">
                    {product.addons.map((addon, index) => (
                          <div key={index} >
                            <input
                              type="text"
                              placeholder="Add-on Name"
                              value={addon.name || ''}
                              onChange={(e) => handleAddonNameChange(e, index)}
                              className="input-style"
                            />
                            <input
                              type="text"
                              placeholder="Add-on Values (comma-separated)"
                              value={addon.options ? addon.options.join(', ') : ''}
                              onChange={(e) => handleAddonValuesChange(e, index)}
                              className="input-style"
                            />

                            <div className="checkbox-wrapper">
                            <input
                              type="checkbox"
                              checked={addon.checkbox || false}
                              onChange={(e) => handleCheckboxChange(e, index)}
                            />
                            <label>isCheckedBox</label>
                          </div>
                          <hr />
                          </div>
                      ))}
                  </div >
                    <div className="d-flex" style={{float:"right"}}>
                    <button
                      onClick={addMoreAddon} 
                      className="btn m-1 d-flex justify-content-center align-items-center flex items-center gap-2 text-white border px-4 py-2 rounded-3xl"
                      style={{ width: '180px', background: '#28a745' }}
                    >
                      <Plus size={18} /> Add new
                    </button>
                      <button className="btn m-1 d-flex justify-content-center align-items-center w-full flex items-center gap-2 text-white border px-4 py-2 rounded-3xl" style={{ width: "180px", background: "#ff5c5c" }}>
                        <Delete size={18} /> Delete Item
                      </button>
                    </div>
                  </div>
                </div>
                
                </>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        {type === "add" ? (
          <div
            className="d-flex"
            style={{ float: 'right', gap: '12px', marginTop: '20px' }}
          >
            <button
              className="btn m-1 d-flex justify-content-center align-items-center flex items-center gap-2 bg-white text-black border px-4 py-2 rounded-3xl"
              style={{ width: '160px' }}
            >
              <RotateCcw size={18} /> Clear Item
            </button>

            <button
              className="btn m-1 d-flex justify-content-center align-items-center flex items-center gap-2 text-white border px-4 py-2 rounded-3xl"
              style={{ width: '180px', background: '#28a745' }}
            >
              <Plus size={18} /> Add Item
            </button>
          </div>
        ) : (
          <div className="d-flex" style={{ float: "right" }}>
            <button className="btn m-1 d-flex justify-content-center align-items-center w-full flex items-center gap-2 bg-white text-black border px-4 py-2 rounded-3xl" style={{ width: "150px" }}>
              <Edit size={18} /> Edit Item
            </button>
            <button className="btn m-1 d-flex justify-content-center align-items-center w-full flex items-center gap-2 text-white border px-4 py-2 rounded-3xl" style={{ width: "180px", background: "#ff5c5c" }}>
              <Delete size={18} /> Delete Item
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
