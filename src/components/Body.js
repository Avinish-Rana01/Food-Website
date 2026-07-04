import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import useRestaurants from "../utlis/useRestaurants";

const Body = ({ setPage, setSelectedRestaurantId }) => {
  const allRestaurants = useRestaurants();
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    if (allRestaurants && allRestaurants.length > 0) {
      setListOfRestaurants(allRestaurants);
    }
  }, [allRestaurants]);

  const handleTopRatedFilter = () => {
    setIsFiltered(!isFiltered);
    if (!isFiltered && allRestaurants && allRestaurants.length > 0) {
      const filteredList = allRestaurants.filter(
        (res) => res?.info?.avgRating > 4.2
      );
      setListOfRestaurants(filteredList);
    } else {
      setListOfRestaurants(allRestaurants);
    }
  };

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body1">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={handleTopRatedFilter}
        >
          {" "}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
            <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
          </svg>
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurants?.map((x, index) => ( 
          <RestaurantCard key={index} resData={x} setPage={setPage} setSelectedRestaurantId={setSelectedRestaurantId} />
          // <Shimmer/>
        ))}
      </div>
    </div>
  );
};

export default Body;
