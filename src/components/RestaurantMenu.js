import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../utlis/cartSlice";
import MenuItem from "./MenuItem";

const RestaurantMenu = (props) => {
  const [menuItems, setMenuItems] = useState([]);
  const [restaurantId, setRestaurantId] = useState(props.restaurantId);

  // useEffect(() => {
  //   // Extract restaurant ID from URL if props.restaurantId is null
  //   if (!props.restaurantId) {
  //     const params = new URLSearchParams(window.location.search);
  //     const idFromUrl = params.get("id");
  //     if (idFromUrl) {
  //       setRestaurantId(idFromUrl);
  //     }
  //   } else {
  //     setRestaurantId(props.restaurantId);
  //   }
  // }, [props.restaurantId]);

  useEffect(() => {
    if (restaurantId) {
      fetchMenu();
    }
  }, [restaurantId]);

  const fetchMenu = async () => {
    // console.log("Fetching menu for restaurant ID:", restaurantId);
    try {
      const data = await fetch(
        `https://avi-grills-api.onrender.com/api/restaurant/${restaurantId}`,
      );
      const json = await data.json();
      setMenuItems(json);
    } catch (error) {
      // console.error("Error fetching menu:", error);
    }
  };

  const allCards =
    menuItems?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  // Show loading state while data is being fetched
  if (!menuItems?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center font-bold text-gray-500">
        Loading Menu...
      </div>
    );
  }

  const {
    name,
    costForTwoMessage,
    costForTwo,
    avgRating,
    cloudinaryImageId,
    cuisines,
    locality,
    totalRatingsString,
  } = menuItems?.data?.cards[2]?.card?.card?.info || {};

  return (
    <div className="min-h-screen pt-8 pb-16 font-sans flex justify-center">
      <div className="w-full max-w-212.5 pb-16">
        {/* Restaurant Header Banner */}
        <div className="border-b-2 border-orange-200 pb-8 pt-6 px-4 md:px-10 mb-12 rounded-b-3xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            {/* Left Details */}
            <div className="flex-1 pr-4">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
                {name}
              </h1>
              <p className="text-gray-500 text-sm mb-1">
                {cuisines?.join(", ")}
              </p>
              <p className="text-gray-500 text-sm mb-5">{locality}</p>

              <div className="flex items-center gap-4 text-sm font-semibold">
                <span className="flex items-center gap-1 bg-green-600 text-white px-2.5 py-1.5 rounded-lg shadow-sm">
                  ★ {avgRating}{" "}
                  <span className="text-xs font-medium border-l border-white/40 pl-1.5 ml-1.5">
                    {totalRatingsString || "100+"}
                  </span>
                </span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-700 font-medium">
                  {costForTwoMessage || `₹${costForTwo / 100} for two`}
                </span>
              </div>
            </div>

            {/* Right Image */}
            {cloudinaryImageId && (
              <div className="mt-6 md:mt-0 md:ml-6 shrink-0">
                <img
                  className="w-36 h-36 md:w-44 md:h-44 object-cover rounded-2xl shadow-md border border-gray-100"
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
                  alt={name}
                />
              </div>
            )}
          </div>
        </div>

        {/* Menu Listing */}
        <div className="px-4 md:px-10">
          <div className="flex items-center justify-center mb-12">
            <h2 className="text-[22px] font-extrabold tracking-[0.2em] uppercase text-gray-800 border-b-2 border-orange-500 pb-2">
              Menu
            </h2>
          </div>
          <div className="flex flex-col gap-8">
            {allCards
              ?.filter((card) => card?.card?.card?.itemCards)
              ?.map((card, index) => {
                const section = card.card.card;
                return <RestaurantCategory key={index} section={section} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

const RestaurantCategory = ({ section }) => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const handleAddItem = (item) => {
    dispatch(addItemToCart({ ...item, section: section?.title }));
  };

  return (
    <div className="w-full">
      {/* Section Title Container */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="px-8 py-7 bg-orange-100/40 flex justify-between items-center cursor-pointer transition-all hover:bg-orange-100/70 active:scale-[0.99]"
      >
        <h3 className="text-[18px] font-extrabold text-gray-800 tracking-wide">
          {section?.title}
          <span className="pl-2 text-[18px] font-extrabold text-gray-800 tracking-wide">
            ({section?.itemCards?.length})
          </span>
        </h3>
        <span
          className={`text-gray-400 text-2xl transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </div>

      {/* Section Items */}
      {isOpen && (
        <div className="px-8 mt-4 overflow-hidden transition-all duration-300">
          {section?.itemCards?.map((item, i) => (
            <MenuItem
              key={i}
              item={item}
              sectionTitle={section?.title}
              onAddItem={handleAddItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
