import { useState, useEffect } from "react";

/**
 * Hook to fetch the complete list of restaurants.
 * Used for maintaining the state of all available restaurants.
 */
const useListOfRestaurants = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch("https://avi-grills-api.onrender.com/api/restaurants");
      const json = await data.json();

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

export default useListOfRestaurants;
