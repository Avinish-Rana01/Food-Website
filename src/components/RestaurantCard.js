import React from "react";
import { CDN_URL } from "../utlis/constants";

const RestaurantCard = (props) => {
  // console.log(props);
  const { resData, setPage, setSelectedRestaurantId } = props;
  
  if (!resData || !resData.info) {
    return null;
  }
  
  const data = resData.info;

  const handleRestaurantClick = () => {
    setPage("menu", data.id);
  };

  return (  
    <div className="res-card" onClick={handleRestaurantClick}> 
      {data.avgRating > 4.2 && <div className="ribbon">Premium</div>}

      <img
        className="res-logo"
        alt={data.name || "Food"}
        src={CDN_URL + data.cloudinaryImageId}
      />

      <div className="card-body">
        <h3 className="title">{data.name}</h3>
        <p className="cuisines">{data.cuisines.join(", ")}</p>

        <div className="meta">
          <span className="rating">{data.avgRating}⭐</span>
          <span className="cost">{data.costForTwo}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
