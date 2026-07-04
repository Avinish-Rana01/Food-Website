import { useState } from "react";
import { useSelector } from "react-redux";

const Header = ({ setPage }) => {
  // Whenever state variables update, react triggers a reconciliation cycle (it re-renders the components)
  const [btnNameRaect, setBtnNameReact] = useState("Login");
  const [activeModal, setActiveModal] = useState(null); // 'about', 'contact', or null
  const closeModal = () => setActiveModal(null);
  //Subscribing the store using the selector function, whenever the state of the store changes, 
  // the selector function will be called and the component will re-render with the new state value.
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <>
      <header className="header">
        <div className="header-left">
          <div className="logo-container cursor-pointer" onClick={() => setPage("home")}>
            <img
              className="logo"
              src="https://static.vecteezy.com/system/resources/thumbnails/024/284/682/small_2x/restaurant-logo-5-png.png"
              alt="Logo"
            />
          </div>
        </div>
        <div className="search-wrapper">
          <input type="text" placeholder="Search..." className="search-input" />
          <svg
            className="search-icon-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <div className="header-right">
          <nav className="nav-wrapper">
            <ul className="nav-link-list">
              <li className="Nav-elements" onClick={() => setPage("home")}>
                Restaurants
              </li>
              <li className="Nav-elements" onClick={() => setPage("about")}>
                About Us
              </li>
              <li className="Nav-elements" onClick={() => setPage("contact")}>
                Contact Us
              </li>
            </ul>
          </nav>
          <div className="Nav-elements cart-nav">
            <svg
              className="cart-icon-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span onClick={() => {
              setPage("cart");
            }}>Cart ({cartItems.length})</span>
          </div>
          <button
            className="Login-button"
            onClick={() => {
              btnNameRaect == "Login"
                ? setBtnNameReact("Logout")
                : setBtnNameReact("Login");
            }}
          >
            {btnNameRaect}
          </button>
        </div>
      </header>

      {/* Modal Popup */}
      {activeModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>

            {activeModal === "about" && (
              <div className="modal-body">
                <h2>About Us</h2>
                <p>
                  Welcome to Food Villa! We are passionate about delivering the
                  tastiest meals to your doorstep.
                </p>
                <p>
                  Our journey began with a simple idea: good food, good mood.
                </p>
              </div>
            )}

            {activeModal === "contact" && (
              <div className="modal-body">
                <h2>Contact Us</h2>
                <p>Have questions? Reach out to us!</p>
                <form className="contact-form">
                  <input type="text" placeholder="Your Name" />
                  <input type="email" placeholder="Your Email" />
                  <textarea placeholder="Message"></textarea>
                  <button type="button">Send Message</button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

// For importing the Header in any different file we first need to export it.
export default Header;
