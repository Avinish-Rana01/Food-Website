import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { Star, ChevronDown, Search, Leaf } from "lucide-react";

// Custom Shimmer for Menu to avoid layout shift
const MenuShimmer = () => {
  return (
    <div className="min-h-screen pt-8 pb-16 font-sans flex justify-center animate-pulse">
      <div className="w-full max-w-4xl px-4 md:px-10">
        <div className="h-64 bg-slate-200 rounded-b-3xl mb-12"></div>
        <div className="flex flex-col gap-8">
          <div className="h-20 bg-slate-200 rounded-2xl w-full"></div>
          <div className="h-20 bg-slate-200 rounded-2xl w-full"></div>
          <div className="h-40 bg-slate-200 rounded-2xl w-full"></div>
        </div>
      </div>
    </div>
  );
};

const RestaurantMenu = (props) => {
  const [menuItems, setMenuItems] = useState([]);
  const [restaurantId, setRestaurantId] = useState(props.restaurantId);
  const [searchQuery, setSearchQuery] = useState("");
  const [isVegOnly, setIsVegOnly] = useState(false);

  useEffect(() => {
    if (restaurantId) {
      fetchMenu();
    }
  }, [restaurantId]);

  const fetchMenu = async () => {
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

  // Show skeleton loading state
  if (!menuItems?.data) {
    return <MenuShimmer />;
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

  // Extract valid sections
  const validSections = allCards?.filter((card) => card?.card?.card?.itemCards) || [];

  return (
    <div className="min-h-screen bg-slate-50 pt-6 pb-16 font-sans flex justify-center">
      <div className="w-full max-w-4xl pb-16">
        
        {/* Restaurant Header Banner - Premium Card Style */}
        <div className="bg-white mx-4 md:mx-10 rounded-[2rem] p-6 md:p-10 mb-8 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Left Details */}
          <div className="flex-1 pr-4">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
              {name}
            </h1>
            <p className="text-slate-500 text-sm md:text-base mb-1 font-medium">
              {cuisines?.join(", ")}
            </p>
            <p className="text-slate-400 text-sm mb-6">{locality}</p>

            <div className="flex items-center gap-4 text-sm font-semibold">
              <span className="flex items-center gap-1.5 bg-green-600 text-white px-3 py-1.5 rounded-lg shadow-sm">
                <Star size={16} fill="currentColor" strokeWidth={0} />
                {avgRating}{" "}
                <span className="text-xs font-medium border-l border-white/40 pl-2 ml-1">
                  {totalRatingsString || "100+"}
                </span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-700 font-bold">
                {costForTwoMessage || `₹${costForTwo / 100} for two`}
              </span>
            </div>
          </div>

          {/* Right Image */}
          {cloudinaryImageId && (
            <div className="mt-8 md:mt-0 md:ml-6 shrink-0 w-full md:w-auto">
              <img
                className="w-full h-48 md:w-48 md:h-48 object-cover rounded-3xl shadow-sm border border-slate-100"
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
                alt={name}
              />
            </div>
          )}
        </div>

        {/* Menu Controls (Search & Filters) */}
        <div className="px-4 md:px-10 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
           <div className="relative w-full sm:w-72">
             <input 
                type="text"
                placeholder="Search in menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all shadow-sm"
             />
             <Search size={18} className="text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
           </div>
           
           <label className="flex items-center gap-2 cursor-pointer bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm w-full sm:w-auto justify-center">
             <span className="text-sm font-semibold text-slate-700">Veg Only</span>
             <div className="relative">
               <input type="checkbox" className="sr-only" checked={isVegOnly} onChange={() => setIsVegOnly(!isVegOnly)} />
               <div className={`block w-10 h-5 rounded-full transition-colors ${isVegOnly ? 'bg-green-500' : 'bg-slate-300'}`}></div>
               <div className={`dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform ${isVegOnly ? 'transform translate-x-5' : ''}`}></div>
             </div>
             <Leaf size={16} className={isVegOnly ? "text-green-600" : "text-slate-400"} />
           </label>
        </div>

        {/* Menu Listing */}
        <div className="px-4 md:px-10">
          <div className="flex flex-col gap-6">
            {validSections.map((card, index) => {
              const section = card.card.card;
              // Filter logic applied to the section's items
              let filteredItems = section?.itemCards || [];
              
              if (searchQuery) {
                filteredItems = filteredItems.filter(item => 
                  item?.card?.info?.name?.toLowerCase().includes(searchQuery.toLowerCase())
                );
              }
              
              if (isVegOnly) {
                filteredItems = filteredItems.filter(item => 
                   item?.card?.info?.itemAttribute?.vegClassifier === "VEG" || item?.card?.info?.isVeg
                );
              }

              // Hide empty sections after filtering
              if (filteredItems.length === 0) return null;

              return (
                 <RestaurantCategory 
                    key={index} 
                    section={{...section, itemCards: filteredItems}} 
                    defaultOpen={index === 0} 
                 />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const RestaurantCategory = ({ section, defaultOpen }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Section Title Button (Accessible) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full px-6 py-5 bg-white flex justify-between items-center cursor-pointer transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-200"
      >
        <h3 className="text-lg font-bold text-slate-800 tracking-tight flex items-center gap-2">
          {section?.title}
          <span className="text-sm font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            {section?.itemCards?.length}
          </span>
        </h3>
        <ChevronDown 
          size={20} 
          className={`text-slate-400 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {/* Section Items */}
      <div 
         className={`transition-all duration-500 ease-in-out ${isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 pb-4">
          {section?.itemCards?.map((item, i) => (
            <MenuItem
              key={i}
              item={item}
              sectionTitle={section?.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
