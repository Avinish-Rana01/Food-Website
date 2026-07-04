import { useSelector, useDispatch } from "react-redux";
import { addItemToCart, removeItem, clearCart } from "../utlis/cartSlice";
import { useState } from "react";

const Cart = ({ setPage }) => {
    const items = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();
    const [orderPlaced, setOrderPlaced] = useState(false);

    // Group items by ID and count quantities
    const groupedItemsMap = items.reduce((acc, item) => {
        if (!acc[item.id]) {
            acc[item.id] = { ...item, quantity: 1 };
        } else {
            acc[item.id].quantity += 1;
        }
        return acc;
    }, {});

    const groupedItems = Object.values(groupedItemsMap);

    // Handle checkout logic
    const handleCheckout = () => {
        setOrderPlaced(true);
        dispatch(clearCart());
    };

    // Conditional rendering for order confirmation
    if (orderPlaced) {
        return (
            <div className="order-confirmation">
                <div className="confirmation-content">
                    <div className="checkmark-circle">
                        <div className="checkmark"></div>
                    </div>
                    <h1>Order Placed Successfully!</h1>
                    <p>Your delicious food is being prepared.</p>
                    <div className="delivery-toast">
                        🚀 Your order will be delivered in <strong>5 minutes!</strong>
                    </div>
                    <button className="back-home-btn" onClick={() => setPage("home")}>
                        Order More Food
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-header">
                <h1>Your Cart</h1>
                <div className="cart-header-btns">
                    <button className="continue-shopping-btn" onClick={() => setPage("home")}>
                        Continue Shopping
                    </button>
                    <button className="clear-cart-btn" onClick={() => dispatch(clearCart())}>
                        Clear Cart
                    </button>
                </div>
            </div>

            {groupedItems.length === 0 ? (
                <div className="empty-cart">
                    <h2>Cart is empty. Add some delicious food!</h2>
                </div>
            ) : (
                <div className="cart-items-container">
                    {groupedItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img
                                src={
                                    item.cloudinaryImageId
                                        ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.cloudinaryImageId}`
                                        : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80"
                                }
                                alt={item.name}
                                className="cart-item-img"
                            />
                            <div className="cart-item-details">
                                <h3>{item.name}</h3>
                                <p>{item.cuisines ? item.cuisines.join(", ") : ""}</p>
                                <p>{item.costForTwoMessage || `₹${(item.price || item.defaultPrice || 0) / 100}`}</p>
                            </div>
                            <div className="cart-qty-control">
                                <button className="qty-btn" onClick={() => dispatch(removeItem(item.id))}>-</button>
                                <span className="qty-count">{item.quantity}</span>
                                <button className="qty-btn" onClick={() => dispatch(addItemToCart(item))}>+</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {items.length > 0 && (
                <div className="cart-summary">
                    <button className="checkout-btn" onClick={handleCheckout}>
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;