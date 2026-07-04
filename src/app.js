import React, { useState, Suspense, lazy, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import RestaurantMenu from "./components/RestaurantMenu";
import Footer from "./components/Footer";
import "./style.css";
import { Provider } from "react-redux"; 
import appStore from "./utlis/appStore";


import SplashScreen from "./components/SplashScreen";
import Shimmer from "./components/Shimmer";

const Product = lazy(() => import("./components/Product"));

const getPageFromURL = () => {
  const path = window.location.pathname;
  if (path.includes("/menu")) return "menu";
  if (path.includes("/about")) return "about";
  if (path.includes("/cart")) return "cart";
  if (path.includes("/contact")) return "contact";
  if (path.includes("/product")) return "product";
  return "home";
};

const AppLayout = () => {
  const [page, setPage] = useState(getPageFromURL);
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem("splashShown");
  });
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("id") || null;
  });

  const handleSetPage = (newPage, restaurantId = null) => {
    setPage(newPage);
    if (restaurantId) setSelectedRestaurantId(restaurantId);
    
    const pathMap = {
      home: "/",
      about: "/about",
      contact: "/contact",
      product: "/product",
      cart: "/cart",
      menu: `/menu${restaurantId ? `?id=${restaurantId}` : ""}`,
    };
    
    window.history.pushState({ page: newPage, restaurantId }, "", pathMap[newPage]);
  };

  useEffect(() => {
    const handlePopState = (event) => {
      const newPage = event.state?.page || getPageFromURL();
      const restaurantId = event.state?.restaurantId || null;
      setPage(newPage);
      if (restaurantId) setSelectedRestaurantId(restaurantId);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleSplashEnter = () => {
    sessionStorage.setItem("splashShown", "true");
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onEnter={handleSplashEnter} />;
  }

  return (
    <div className="app">
      <Header setPage={handleSetPage} />
      {page === "home" && <Body setPage={handleSetPage} setSelectedRestaurantId={setSelectedRestaurantId} />}
      {page === "about" && <About />}
      {page === "contact" && <Contact />}
      {page === "cart" && <Cart setPage={handleSetPage} />}
      {page === "menu" && <RestaurantMenu restaurantId={selectedRestaurantId} />}
      {page === "product" && (
        <Suspense fallback={<Shimmer />}>
          <Product />
        </Suspense>
      )}
      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Provider store={appStore}><AppLayout /></Provider>);
