import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { Star, ChevronDown, Search, Leaf } from "lucide-react";

// Custom Shimmer for Menu to avoid layout shift
const MenuShimmer = () => {
  return (
    <div className="min-h-screen pt-8 pb-16 font-sans flex justify-center bg-[#fcefe7] animate-pulse">
      <div className="w-full max-w-4xl px-4 md:px-10">
        <div className="h-72 bg-white rounded-[2rem] mb-12 shadow-sm"></div>
        <div className="flex flex-col gap-8">
          <div className="h-24 bg-white rounded-2xl w-full shadow-sm"></div>
          <div className="h-24 bg-white rounded-2xl w-full shadow-sm"></div>
          <div className="h-48 bg-white rounded-2xl w-full shadow-sm"></div>
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
    } catch (error) {}
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
    <div className="min-h-screen bg-[#fcefe7] pt-8 pb-20 font-sans flex justify-center">
      <div className="w-full max-w-4xl pb-16">
        
        {/* Restaurant Header Banner - Premium Card Style */}
        <div className="bg-white mx-4 md:mx-0 rounded-[2rem] p-8 md:p-12 mb-10 shadow-[0_18px_40px_rgba(0,0,0,0.06)] border border-[#fe862d]/10 flex flex-col md:flex-row justify-between items-start md:items-center overflow-hidden relative">
          
          {/* Subtle background gradient overlay for premium feel */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#fe862d]/5 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          {/* Left Details */}
          <div className="flex-1 pr-4 relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-3 tracking-tight">
              {name}
            </h1>
            <p className="text-neutral-500 text-base md:text-lg mb-2 font-medium">
              {cuisines?.join(", ")}
            </p>
            <p className="text-neutral-400 text-sm md:text-base mb-8">{locality}</p>

            <div className="flex items-center gap-5 text-sm font-semibold">
              <span className="flex items-center gap-1.5 bg-gradient-to-r from-[#fe862d] to-[#ff9e56] text-white px-4 py-2 rounded-xl shadow-[0_6px_15px_rgba(254,134,45,0.25)]">
                <Star size={16} fill="currentColor" strokeWidth={0} />
                <span className="text-base">{avgRating}</span>
                <span className="text-xs font-medium border-l border-white/40 pl-2 ml-1">
                  {totalRatingsString || "100+"}
                </span>
              </span>
              <span className="text-neutral-300 text-xl">•</span>
              <span className="text-neutral-800 font-bold text-lg bg-neutral-50 px-4 py-2 rounded-xl border border-neutral-100 shadow-sm">
                {costForTwoMessage || `₹${costForTwo / 100} for two`}
              </span>
            </div>
          </div>

          {/* Right Image */}
          {cloudinaryImageId && (
            <div className="mt-10 md:mt-0 md:ml-8 shrink-0 w-full md:w-auto relative z-10">
              <img
                className="w-full h-56 md:w-56 md:h-56 object-cover rounded-3xl shadow-[0_12px_30px_rgba(0,0,0,0.12)] border-4 border-white transform transition-transform duration-500 hover:scale-105"
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
                alt={name}
              />
            </div>
          )}
        </div>

        {/* Menu Controls (Search & Filters) - Sticky for convenience */}
        <div className="sticky top-[110px] z-30 bg-[#fcefe7]/90 backdrop-blur-md py-4 px-4 md:px-0 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-[#fe862d]/10">
           <div className="relative w-full sm:w-80">
             <input 
                type="text"
                placeholder="Search for delicious food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-neutral-200 rounded-full py-3.5 pl-12 pr-6 text-base focus:outline-none focus:ring-4 focus:ring-[#fe862d]/20 focus:border-[#fe862d] transition-all shadow-sm font-medium text-neutral-800 placeholder-neutral-400"
             />
             <Search size={20} className="text-[#fe862d] absolute left-4 top-1/2 transform -translate-y-1/2 opacity-80" />
           </div>
           
           <label className="flex items-center gap-3 cursor-pointer bg-white px-5 py-3 rounded-full border border-neutral-200 shadow-sm w-full sm:w-auto justify-center transition-all hover:shadow-md hover:border-[#fe862d]/30">
             <span className="text-base font-semibold text-neutral-700">Veg Only</span>
             <div className="relative">
               <input type="checkbox" className="sr-only" checked={isVegOnly} onChange={() => setIsVegOnly(!isVegOnly)} />
               <div className={`block w-12 h-6 rounded-full transition-colors duration-300 ${isVegOnly ? 'bg-green-500' : 'bg-neutral-200'}`}></div>
               <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-sm ${isVegOnly ? 'transform translate-x-6' : ''}`}></div>
             </div>
             <Leaf size={18} className={isVegOnly ? "text-green-500" : "text-neutral-400"} />
           </label>
        </div>

        {/* Menu Listing */}
        <div className="px-4 md:px-0">
          <div className="flex flex-col gap-8">
            {validSections.map((card, index) => {
              const section = card.card.card;
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
    <div className="w-full bg-white rounded-3xl shadow-[0_8px_25px_rgba(0,0,0,0.04)] border border-neutral-100 overflow-hidden transition-all duration-300 hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full px-6 py-6 md:px-8 bg-white flex justify-between items-center cursor-pointer transition-colors hover:bg-neutral-50/50 focus:outline-none"
      >
        <h3 className="text-xl md:text-2xl font-bold text-neutral-800 tracking-tight flex items-center gap-3">
          {section?.title}
          <span className="text-sm font-bold text-[#fe862d] bg-[#fe862d]/10 px-3 py-1 rounded-full">
            {section?.itemCards?.length}
          </span>
        </h3>
        <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-[#fe862d]/10' : 'bg-neutral-100'}`}>
          <ChevronDown 
            size={24} 
            className={`transform transition-transform duration-300 ${isOpen ? "rotate-180 text-[#fe862d]" : "text-neutral-500"}`} 
          />
        </div>
      </button>

      <div className={`transition-all duration-500 ease-in-out ${isOpen ? "max-h-[8000px] opacity-100 pb-4" : "max-h-0 opacity-0"}`}>
        <div className="px-4 md:px-6">
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
