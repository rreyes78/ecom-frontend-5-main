import React,{useContext,useState} from 'react'
import { Plus, Upload, Edit, Filter, RotateCcw, RefreshCcw } from 'lucide-react'
import "./itemManagement.scss"
import RestaurantCard from "../components/shared/RestaurantCard"
import { useAuth } from "../Context/AuthContext"
import { useAppContext } from "../Context/Context";
import { Navigate } from "react-router-dom";
import ProductModal from "./shared/ProductModal"


const ItemManagement = () => {
  const { token } = useAuth();
  const { data: restaurantData, isError: error, refreshData } = useAppContext();

  const [selectedItems, setSelectedItems] = useState([]);

  const [selectedItem, setSelectedItem] = useState([]);


  const handleSelectAll = () => {
    if (selectedItems.length === restaurantData.length) {
      setSelectedItems([]); // Unselect all
    } else {
      setSelectedItems(restaurantData.map((_, index) => index)); // Select all
    }
  };
  
  const handleItemSelect = (index) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    );
  };
  
  const isAllSelected = selectedItems.length === restaurantData.length;


  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="p-2">
          <h1 className="text-2xl font-bold">Item Management</h1>
        </div>
      </div>

      {/* <ProductModal 
          type={"add"}
       /> */}

      <div className="d-block" style={{ maxWidth: "300px", minWidth: "300px", float: "right" }}>
        <button
          className="m-1 d-flex justify-content-center align-items-center btn btn-success w-full flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-3xl"
          style={{ width: "100%", background: "#66c172" }}
        >
          <Plus size={18} /> Add Item
        </button>
        <button
          onClick={refreshData}
          className="btn m-1 d-flex justify-content-center align-items-center w-full flex items-center gap-2 bg-white text-black border px-4 py-2 rounded-3xl"
          style={{ width: "100%" }}
        >
          <RefreshCcw size={18} /> Refresh
        </button>
        <button className="btn m-1 d-flex justify-content-center align-items-center w-full flex items-center gap-2 bg-white text-black border px-4 py-2 rounded-3xl" style={{ width: "100%" }}>
          <Upload size={18} /> Import Items
        </button>
        <button className="btn m-1 d-flex justify-content-center align-items-center w-full flex items-center gap-2 bg-white text-black border px-4 py-2 rounded-3xl" style={{ width: "100%" }}>
          <Edit size={18} /> Edit Item
        </button>
      </div>

      <div className="d-flex gap-2">
        <button className="d-flex justify-content-center align-items-center btn btn-info flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-3xl">
          <Filter size={18} /> Show Filter
        </button>

        <button className="d-flex justify-content-center align-items-center btn btn-info flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-3xl">
          <RotateCcw size={18} /> Reset Filter
        </button>
      </div>

      <div className="d-flex p-4 gap-2">
          <label className="d-flex align-items-center gap-2">
            <input
              type="checkbox"
              style={{ width: "20px", height: "20px" }}
              checked={isAllSelected}
              onChange={handleSelectAll}
            />
            Select All
          </label>
        </div>



      <div className="p-2 d-flex gap-2 flex-wrap card-menu">
        {error && <p className="text-red-500">{error}</p>}
        {restaurantData.length > 0 ? (
          restaurantData.map((item, index) => (

            <RestaurantCard
              key={index}
              image={item.image}
              name={item.name}
              price={item.price}
              addons={item.addons}
              isSelected={selectedItems.includes(index)}
              onSelect={() => handleItemSelect(index)}
              onShowAddBillingModal={false}
            />

          ))
        ) : (
          <p> No item found..</p>
        )}
      </div>
    </div>
  );
};

export default ItemManagement;
