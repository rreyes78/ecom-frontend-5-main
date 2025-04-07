import React, { useEffect, useState } from 'react';
import { Plus, RefreshCcw, Edit, RotateCcw, Delete, ChevronDown, X,Trash2, LucideScissorsSquareDashedBottom } from 'lucide-react';
import './productModal.css';
import {useAuth} from "../../Context/AuthContext"
import axios from "axios";
import { useAppContext } from "../../Context/Context";

const ProductModal = ({ imageUrl ,selectedItem, showModal, type, onClose }) => {

  const {refreshData} =useAppContext()
  const { token } = useAuth();
  const [hasData, setHasData] = useState(selectedItem || false);
  const [addAddOn, setAddAddOn] = useState(false)
  const [isDisableField, setIsDisableField] = useState(type == 'edit' || false)
  const [submitType, setSubmitType] = useState("")
  const [imageMpdified, setImageMpdified] = useState(false)
  // const [openAddOnModal]
  const [product, setProduct] = useState(
    selectedItem || {
      name: '',
      price: '',
      category: '',
      imageUrl:'',
      addons: [{}],
      releaseDate: '',
    }
  );

  const [image, setImage] = useState(null);

  const [imageFile, setImageFile] = useState(null); // new state to store the real File


  const [dragActive, setDragActive] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const confirmDelete = () => {
    set
    setShowConfirmModal(false);
  };

  useEffect(()=>{
    if(selectedItem) {
      setImageFile(selectedItem.imageName)
      setImage(selectedItem.imageUrl)
    }

  },[selectedItem])

  

  useEffect(()=>{
    if(product.addons.length <=0) {
      product.addons=[{}];
    }
  },[product])

  useEffect(()=>{
    type=submitType;
  },[submitType])

  const handleShowEdiBtn = () => {
    setIsDisableField(false)
  };

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

  const handleDeleteAddonItem = (index) => {

    if (product.addons.length <= 1) return;
    
    const newAddons = [...product.addons];
    newAddons.splice(index, 1);
    setProduct({ ...product, addons: newAddons });
  };
  

  const addMoreAddon = () => {


    // const lastAddon = product.addons[product.addons.length - 1];
    // const nameIsValid = lastAddon?.name && lastAddon?.name.trim() !== '';

    // const optionsIsValid = Array.isArray(lastAddon.options) &&
    //   lastAddon.options.length > 0 &&
    //   lastAddon.options.every(opt => opt.trim() !== '');


  
    // if (!nameIsValid || !optionsIsValid) {
    //   alert("Please enter a valid Add-on Name and at least one non-empty Add-on Value.");
    //   return;
    // }
  
    setProduct({
      ...product,
      addons: [...product.addons, {}], // Add new empty add-on
    });
  };

  const close = () => {
    setAddAddOn(false)
  };
  

  const handleCloseModal = (e) => {
    e.stopPropagation();
    onClose();
  };

  const clearItem = () => {
    setProduct(
      selectedItem || {
        name: '',
        price: '',
        category: '',
        imageUrl: '',
        addons: [{}],
        releaseDate: '',
      }
    );
    setImage(null); // clear uploaded image
    setImageFile(null);
    setSubmitType("")
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
    const file = e.dataTransfer.files[0];
    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file)); // keep this if you still want preview
    }
  };

  const viewAddon = () => {
    setAddAddOn(true);
    setSubmitType("")
  };

  const clearAllAddOn = () => {
    
    setProduct({
      ...product,
      addons: [{}], // remove all add-on
    });
  };

  const closeModalAddOn = () => {
    // setAddAddOn(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    // Only append the imageFile if it's a real File (user selected a new one)
      if (imageFile instanceof File) {
        formData.append("imageFile", imageFile);
      }
    formData.append( "menu",new Blob([JSON.stringify(product)], { type: "application/json" }));
  
    console.log("Sending product:", product);
    console.log("Sending image file:", imageFile);
    if (type === 'add') {
      addProduct(formData);
    } else if (type === 'update') {
      updateProduct(formData);
    } else if (type === 'delete') {
      deleteProduct();
    }
  };
  const addProduct = (formData) => {
    axios
      .post("http://localhost:8080/api/item", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Product added successfully:", response.data);
        resetForm();
        onClose();
        alert("Product added successfully");
        refreshData();
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("Error adding product");
      });
  };
  
  const updateProduct = (formData) => {
    axios
      .put(`http://localhost:8080/api/item/${selectedItem.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Product updated successfully:", response.data);
        resetForm();
        onClose();
        alert("Product updated successfully");
        refreshData();
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        alert("Error updating product");
      });
  };
  
  const deleteProduct = () => {
    axios
      .delete(`http://localhost:8080/api/item/${selectedItem.id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Product deleted successfully:", response.data);
        resetForm();
        onClose();
        alert("Product deleted successfully");
        refreshData();
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        alert("Error deleting product");
      });
  };
  
  const resetForm = () => {
    setProduct({
      name: '',
      price: '',
      category: '',
      imageUrl: '',
      addons: [{}],
      releaseDate: '',
    });
    setImage(null);
  };
  

  if (!showModal) return null;

  return (
    <div className="inventory-modal-overlay" onClick={handleCloseModal}>
      <form className="row g-3 pt-5" onSubmit={submitHandler}>
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
            {imageFile ? (
              <img src={image || imageUrl} alt="Preview" className="preview-image" />
            ) : (
              <p>Drag & Drop Image Here or Click to Upload</p>
            )}

            <input
              type="file"
              accept="image/*"
              disabled={isDisableField}
              onChange={handleImageChange}
              className="file-input "
            />
          </div>
          {imageFile && !isDisableField ?(<><p className="d-bleck preview-image" style={{ width: "200px", margin: "0", padding:"0"}}>Click the image to change.</p></>):(<></>)}
          </div>

          {/* Input Fields */}
          <div className="input-fields p-0" style={{ width: "60%" }}>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              placeholder="Menu Name"
              className={`input-style ${isDisableField ? "disabled" : ""}`}
            />
             <input
                type="number"
                name="price"
                value={product.price}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!isNaN(value) && Number(value) >= 0) {
                    setProduct({ ...product, price: value });
                  }
                }}
                placeholder="Price"
                className={`input-style ${isDisableField ? "disabled" : ""}`}
                min="0"
                step="0.01"
              />

            <div className="select-wrapper">
              <select
                name="category"
                value={product.category}
                onChange={handleInputChange}
                className={`custom-select ${isDisableField ? "disabled" : ""}`}
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
              className={`input-style ${isDisableField ? "disabled" : ""}`}
            />

            {/* Add-ons Section */}
            <div className="addons-section">
            {/* addAddon */}
            <button
              onClick={viewAddon}
              className={`btn-add-addon ${isDisableField ? "disabled" : ""}`}
              disabled={isDisableField} // Optional: If you want the button to actually be disabled (non-clickable)
            >
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
                                required
                                value={addon.name || ''}
                                onChange={(e) => handleAddonNameChange(e, index)}
                                className="input-style input-style-add-on"
                              />

                              <input
                                type="text"
                                placeholder="Add-on Values (comma-separated)"
                                required
                                value={addon.options ? addon.options.join(', ') : ''}
                                onChange={(e) => handleAddonValuesChange(e, index)}
                                className="input-style input-style-add-on"
                                 
                              />


                            <div className="checkbox-wrapper">
                            <input
                              type="checkbox"
                              checked={addon.checkbox || false}
                              onChange={(e) => handleCheckboxChange(e, index)}
                            />
                            <label>isCheckedBox</label>
                            <button
                                onClick={() => handleDeleteAddonItem(index)}
                                className="ml-2 text-danger d-flex align-items-center gap-1 bg-transparent border-0 hover-delete"
                                style={{ cursor: 'pointer' }}
                              >
                                <Trash2 size={16} /> Delete
                              </button>
                          </div>
                          <hr />
                          </div>
                      ))}
                  </div >
                    <div className="d-flex" style={{float:"right"}}>
                    <button
                      className="btn m-1 d-flex justify-content-center align-items-center w-full bg-white flex items-center gap-2 text-black border px-4 py-2 rounded-3xl"
                      onClick={close}
                      style={{ width: "120px", background: "#ff5c5c" }}
                    >
                      <X size={18} /> Close
                    </button>
                    <button
                      onClick={addMoreAddon} 
                      className="btn m-1 d-flex justify-content-center align-items-center flex items-center gap-2 text-white border px-4 py-2 rounded-3xl"
                      style={{ width: '180px', background: '#28a745' }}
                    >
                      <Plus size={18} /> Add new
                    </button>
                      <button className="btn m-1 d-flex justify-content-center align-items-center w-full flex items-center gap-2 text-white border px-4 py-2 rounded-3xl" 
                      onClick={clearAllAddOn}
                      style={{ width: "180px", background: "#ff5c5c" }}>
                        <Delete size={18} /> Delete All
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
              onClick={setShowConfirmModal(true)}

            >
              <RotateCcw size={18} /> Clear Item
            </button>

            <button
             type="submit"
              className="btn m-1 d-flex justify-content-center align-items-center flex items-center gap-2 text-white border px-4 py-2 rounded-3xl"
              style={{ width: '180px', background: '#28a745' }}
            >
              <Plus size={18} /> Add Item
            </button>
          </div>
        ) : (
          <div className="d-flex" style={{ float: "right" , marginRight:"2.6rem"}}>

            {isDisableField ? (<>
                    <button className="btn m-1 d-flex justify-content-center align-items-center w-full flex items-center gap-2 bg-white text-black border px-4 py-2 rounded-3xl"
                      onClick={handleShowEdiBtn}
                      style={{ width: "190px" }}>
                        <Edit size={18} /> Edit item
                  </button>
            </>):(<>
              <button className="btn m-1 d-flex justify-content-center align-items-center w-full flex items-center gap-2 bg-white text-black border px-4 py-2 rounded-3xl"
                      onClick={() => setSubmitType("update")}
                      style={{ width: "190px" }}>
                        <RefreshCcw size={18} /> Update item
                  </button>
            
            </>)}
            
            <button className="btn m-1 d-flex justify-content-center align-items-center w-full flex items-center gap-2 text-white border px-4 py-2 rounded-3xl"
            onClick={() => setSubmitType("delete")}
             style={{ width: "180px", background: "#ff5c5c" }}>
              <Delete size={18} /> Delete Item
            </button>
          </div>
        )}
      </div>
      </form>


      
      
    </div>
  );
};

export default ProductModal;
