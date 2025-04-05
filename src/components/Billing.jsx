import React from 'react';
import './billing.css'

const Billing = () => {
  return (
    <div className="poppins-regular" style={{ boxSizing: "border-box" }}>
      <div className="billing-card" style={{ boxSizing: "border-box" }}>
        <h6>Bills</h6>

        {/* Billing items added here */}
        <div
          className="d-flex justify-content-between align-items-center w-100"
          style={{ boxSizing: "border-box", overflow: "hidden", marginBottom: ".5rem" }}
        >
          <img
            src="https://modernmealmakeover.com/wp-content/uploads/2020/10/IMG_6548-4.jpg"
            style={{ width: "40px", height: "40px", borderRadius: "9px", backgroundColor: "red" }}
            alt="Milk Tea"
          />
          <div className="w-100 justify-content-between align-items-center gap-2" style={{ marginLeft: "1rem", overflow: "hidden", padding: "0", fontSize: "12px" }}>
            <div className="text-nowrap" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "60%" }}>Milk Tea</div>
            <small className="text-muted">Vanilla, Mild</small>
          </div>
          <div>
            <div className="text-nowrap d-flex justify-content-end font-weight-bold">$7.09</div>
            <div className="text-nowrap d-flex justify-content-end">
              <div className="d-flex gap-2">
                {/* Minus Button */}
                <div className="w-auto h-auto d-flex align-items-center justify-content-center bg-light rounded-lg p-2">
                  <i style={{ fontSize: "7px" }} className="fas fa-minus text-muted"></i>
                </div>

                {/* Quantity */}
                <span className="d-flex align-items-center" style={{ fontSize: "12px" }}>2</span>

                {/* Plus Button */}
                <div className="w-auto h-auto d-flex align-items-center justify-content-center bg-danger rounded-lg p-2">
                  <i style={{ fontSize: "7px" }} className="fa-solid fa-plus text-white"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Billing Item */}
        <div className="d-flex justify-content-between align-items-center w-100" style={{ boxSizing: "border-box", overflow: "hidden", marginBottom: ".5rem" }}>
          <img
            src="https://modernmealmakeover.com/wp-content/uploads/2020/10/IMG_6548-4.jpg"
            style={{ width: "40px", height: "40px", borderRadius: "9px", backgroundColor: "red" }}
            alt="Waffle"
          />
          <div className="w-100 justify-content-between align-items-center gap-2" style={{ marginLeft: "1rem", overflow: "hidden", padding: "0", fontSize: "12px" }}>
            <div className="text-nowrap" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "60%" }}>Waffle</div>
            <small className="text-muted">Vanilla, Ice Cream</small>
          </div>
          <div>
            <div className="text-nowrap d-flex justify-content-end font-weight-bold">$5.00</div>
            <div className="text-nowrap d-flex justify-content-end">
              <div className="d-flex gap-2">
                {/* Minus Button */}
                <div className="w-auto h-auto d-flex align-items-center justify-content-center bg-light rounded-lg p-2">
                  <i style={{ fontSize: "7px" }} className="fas fa-minus text-muted"></i>
                </div>

                {/* Quantity */}
                <span className="d-flex align-items-center" style={{ fontSize: "12px" }}>1</span>

                {/* Plus Button */}
                <div className="w-auto h-auto d-flex align-items-center justify-content-center bg-danger rounded-lg p-2">
                  <i style={{ fontSize: "7px" }} className="fa-solid fa-plus text-white"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Info */}
        <hr />
        <div className="d-flex justify-content-between">
          <p>Subtotal</p>
          <p className="text-muted">$27.18</p>
        </div>
        <div className="d-flex justify-content-between">
          <p>Discount</p>
          <p className="text-muted">-$5.00</p>
        </div>
        <div className="d-flex justify-content-between">
          <p>Tax</p>
          <p className="text-muted">$1.99</p>
        </div>
        <hr />
        <div className="d-flex justify-content-between fw-bold">
          <p>Total</p>
          <p>$20.51</p>
        </div>

        {/* Payment Method */}
        <h6 className="mt-4">Payment Method</h6>
        <div className="d-flex gap-2 align-items-center justify-content-center">
          <button className="btn btn-outline-secondary w-40">
            <div><i className="fa-solid fa-money-check-dollar"></i></div>
            <div style={{ fontSize: "12px" }}>Debit Card</div>
          </button>
          <button className="btn btn-outline-danger w-40">
            <div><i className="fa-regular fa-credit-card"></i></div>
            <div style={{ fontSize: "12px" }}>Credit Card</div>
          </button>
        </div>

        {/* Add to Billing Button */}
        <button className="btn btn-danger w-100 mt-3">Add to Billing</button>
      </div>
    </div>
  );
};

export default Billing;
