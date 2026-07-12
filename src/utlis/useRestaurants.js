import { useState, useEffect } from "react";

/**
 * Custom hook to fetch and manage the initial list of restaurants.
 * Provides the main restaurant grid data from the API.
 */
const useRestaurants = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://avi-grills-api.onrender.com/api/restaurants",
      );
      console.log(data);
      const json = await data.json();
      
      // Find the card that contains the restaurant list dynamically
      const restaurantCard = json?.data?.cards?.find(
        (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );

      const restaurants =
        restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      setListOfRestaurants(restaurants);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  return listOfRestaurants;
};

export default useRestaurants;