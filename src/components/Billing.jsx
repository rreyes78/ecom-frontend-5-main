import React, { useEffect, useState } from 'react';
import './billing.css';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCartContext } from '../Context/cartContext';
import { useAppContext } from '../Context/Context';

const Billing = () => {
  const { imgUrl } = useAppContext();
  const [imageUrl, setImageUrl] = useState('');
  const { cart, handleCartActions } = useCartContext();
  const [subtotal, setSubtotal] = useState(0);
  const [total_discount, setTotalDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);

  const handlePlusBtn = (cartItem, count) => {
    handleCartActions('updateCartItem', cartItem, count + 1);
  };

  const handleMinusBtn = (cartItem, count) => {
    handleCartActions('updateCartItem', cartItem, count - 1);
  };

  const handleDeleteAddonItem = (cartItem) => {
    setSelectedItemToDelete(cartItem);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    handleCartActions('removeToCart', selectedItemToDelete);
    setShowConfirmModal(false);
  };

  useEffect(() => {
    setSubtotal(
      cart.reduce((acc, item) => acc + item.cartItem.price * item.count, 0).toFixed(2)
    );
    setTotalDiscount(
      cart.reduce((acc, item) => acc + item.discount, 0).toFixed(2)
    );
    setTotal(subtotal - total_discount);
  }, [cart, subtotal]);

  return (
    <div className="poppins-regular" style={{ boxSizing: 'border-box' }}>
      <div className="billing-card" style={{ boxSizing: 'border-box' }}>
        <h6>Bills</h6>

        {cart.length <= 0 ? (
          <div
            className="d-flex justify-content-center align-items-center billing-div"
          >
            <p className="text-muted ">No item was added</p>
          </div>
        ) : (
          <div className="billing-div">
            {cart?.map(({ cartItem, count }, Index) => (
              <div
                className="d-flex justify-content-between align-items-center w-100 item-detail"
                style={{ boxSizing: 'border-box', overflow: 'hidden', marginBottom: '.5rem' }}
                key={Index}
              >
                <img
                  src={cartItem.imageUrl}
                  style={{ width: '60px', height: '60px', borderRadius: '9px' }}
                  alt="Milk Tea"
                />
                <div
                  className="w-100 justify-content-between align-items-center gap-2"
                  style={{ marginLeft: '1rem', overflow: 'hidden', padding: '0', fontSize: '12px' }}
                >
                  <div
                    className="text-nowrap"
                    style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '60%' }}
                  >
                    {cartItem.name}
                  </div>
                  <small className="text-muted">{cartItem.category}</small>
                </div>
                <div>
                  <div className="text-nowrap d-flex justify-content-end font-weight-bold">
                    ${cartItem.price}
                  </div>
                  <div className="text-nowrap d-flex justify-content-end">
                    <div className="d-flex gap-2">
                      <div
                        className="w-auto h-auto d-flex align-items-center justify-content-center bg-light rounded-lg p-2 hover-effect minus"
                        onClick={() => handleMinusBtn(cartItem, count)}
                        style={{ cursor: 'pointer' }}
                      >
                        <Minus size={12} color="#6c757d" />
                      </div>
                      <span className="d-flex align-items-center" style={{ fontSize: '12px' }}>
                        {count}
                      </span>
                      <div
                        className="w-auto h-auto d-flex align-items-center justify-content-center bg-danger rounded-lg p-2 hover-effect"
                        onClick={() => handlePlusBtn(cartItem, count)}
                        style={{ cursor: 'pointer' }}
                      >
                        <Plus size={12} color="#fff" />
                      </div>
                      <button
                        onClick={() => handleDeleteAddonItem(cartItem)}
                        className="ml-2 text-danger d-flex align-items-center gap-1 bg-transparent border-0 hover-delete"
                        style={{ cursor: 'pointer' }}
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <hr />
        <div className="d-flex justify-content-between">
          <p>Subtotal</p>
          <p className="text-muted">${subtotal}</p>
        </div>
        <div className="d-flex justify-content-between">
          <p>Discount</p>
          <p className="text-muted">-${total_discount}</p>
        </div>
        <div className="d-flex justify-content-between">
          <p>Tax</p>
          <p className="text-muted">$1.99</p>
        </div>
        <hr />
        <div className="d-flex justify-content-between fw-bold">
          <p>Total</p>
          <p>${total}</p>
        </div>

        <h6 className="mt-4">Payment Method</h6>
        <div className="d-flex gap-2 align-items-center justify-content-center">
          <button className="btn btn-outline-secondary w-40">
            <div>
              <i className="fa-solid fa-money-check-dollar"></i>
            </div>
            <div style={{ fontSize: '12px' }}>Debit Card</div>
          </button>
          <button className="btn btn-outline-danger w-40">
            <div>
              <i className="fa-regular fa-credit-card"></i>
            </div>
            <div style={{ fontSize: '12px' }}>Credit Card</div>
          </button>
        </div>

        <button className="btn btn-danger w-100 mt-3">Add to Billing</button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Remove Item</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowConfirmModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to remove this item from the cart?
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={confirmDelete}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;