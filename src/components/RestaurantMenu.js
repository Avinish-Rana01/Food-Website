import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { Star, ChevronDown, Search, Leaf } from "lucide-react";

/* ─── Premium Skeleton Loader ─── */
const MenuShimmer = () => {
  return (
    <div className="min-h-screen bg-[#FFF8F3] pt-12 pb-24 flex justify-center">
      <div className="w-full max-w-[960px] px-5 md:px-8">
        {/* Hero skeleton */}
        <div className="bg-white rounded-[2rem] px-8 py-10 md:px-12 md:py-12 mb-14 shadow-[0_4px_40px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-10 animate-pulse">
            <div className="flex-1 space-y-4">
              <div className="h-10 w-3/4 bg-[#FFE7D2] rounded-2xl"></div>
              <div className="h-5 w-1/2 bg-[#FFE7D2]/60 rounded-xl"></div>
              <div className="h-4 w-1/3 bg-[#FFE7D2]/40 rounded-xl"></div>
              <div className="flex gap-3 pt-4">
                <div className="h-10 w-28 bg-[#FFE7D2] rounded-xl"></div>
                <div className="h-10 w-36 bg-[#FFE7D2]/60 rounded-xl"></div>
              </div>
            </div>
            <div className="w-full md:w-44 h-44 bg-[#FFE7D2] rounded-3xl shrink-0"></div>
          </div>
        </div>
        {/* Search skeleton */}
        <div className="animate-pulse mb-14 max-w-2xl mx-auto">
          <div className="h-[56px] bg-white rounded-full shadow-sm"></div>
        </div>
        {/* Category skeletons */}
        <div className="space-y-8 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-3xl px-8 py-8 md:px-10 md:py-10 shadow-[0_2px_20px_rgba(0,0,0,0.03)]">
              <div className="h-7 w-2/5 bg-[#FFE7D2] rounded-xl mb-6"></div>
              <div className="space-y-5">
                {[1, 2].map((j) => (
                  <div key={j} className="flex items-center gap-6">
                    <div className="w-[65%] space-y-3">
                      <div className="h-5 w-3/5 bg-[#FFE7D2]/60 rounded-lg"></div>
                      <div className="h-4 w-1/4 bg-[#FFE7D2]/40 rounded-lg"></div>
                      <div className="h-3 w-full bg-[#FFE7D2]/30 rounded-lg"></div>
                    </div>
                    <div className="w-28 h-28 bg-[#FFE7D2] rounded-2xl shrink-0 ml-auto"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Main Component ─── */
const RestaurantMenu = (props) => {
  const [menuItems, setMenuItems] = useState([]);
  const [restaurantId, setRestaurantId] = useState(props.restaurantId);
  const [searchQuery, setSearchQuery] = useState("");
  const [isVegOnly, setIsVegOnly] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await fetch(
          `https://avi-grills-api.onrender.com/api/restaurant/${restaurantId}`,
        );
        const json = await data.json();
        setMenuItems(json);
      } catch (error) {
        console.error("Failed to fetch menu:", error);
      }
    };

    if (restaurantId) {
      fetchMenu();
    }
  }, [restaurantId]);

  const allCards =
    menuItems?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

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

  const validSections = allCards?.filter((card) => card?.card?.card?.itemCards) || [];

  return (
    <div className="min-h-screen bg-[#FFF8F3] pt-12 pb-28 flex justify-center font-sans">
      <div className="w-full max-w-[960px] px-5 md:px-8">

        {/* ── Restaurant Hero Card ── */}
        <div className="bg-white rounded-[2rem] px-8 py-8 md:px-12 md:py-12 mb-14 shadow-[0_4px_40px_rgba(0,0,0,0.04)] border border-[#F4D8C3]/50 overflow-hidden relative">
          {/* Decorative warm glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#FF8A2A]/[0.04] rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10">
            {/* Left: Info */}
            <div className="flex-1 min-w-0 md:pr-8">
              <h1 className="text-[2.5rem] md:text-[3rem] font-extrabold text-[#2D2D2D] leading-tight tracking-tight mb-4">
                {name}
              </h1>
              <p className="text-[#6B6B6B] text-base md:text-lg font-medium mb-2">
                {cuisines?.join(", ")}
              </p>
              <p className="text-[#6B6B6B]/70 text-sm mb-10">{locality}</p>

              <div className="flex flex-wrap items-center gap-5">
                {/* Rating badge */}
                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF8A2A] to-[#F97316] text-white px-5 py-2.5 rounded-2xl shadow-[0_6px_20px_rgba(255,138,42,0.3)] text-sm font-bold">
                  <Star size={15} fill="currentColor" strokeWidth={0} />
                  <span className="text-[15px]">{avgRating}</span>
                  <span className="w-px h-4 bg-white/30" />
                  <span className="text-xs font-medium opacity-90">
                    {totalRatingsString || "100+"}
                  </span>
                </span>
                {/* Cost pill */}
                <span className="inline-flex items-center text-[#2D2D2D] font-bold text-sm bg-[#FFE7D2]/60 px-5 py-2.5 rounded-2xl border border-[#F4D8C3]">
                  {costForTwoMessage || `₹${costForTwo / 100} for two`}
                </span>
              </div>
            </div>

            {/* Right: Image */}
            {cloudinaryImageId && (
              <div className="w-full md:w-auto shrink-0">
                <img
                  className="w-full h-48 md:w-44 md:h-44 object-cover rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] border-[3px] border-white transition-transform duration-500 hover:scale-[1.03]"
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
                  alt={name}
                />
              </div>
            )}
          </div>
        </div>

        {/* ── Sticky Search & Filter Bar ── */}
        <div className="sticky top-[110px] z-30 bg-[#FFF8F3]/85 backdrop-blur-xl py-5 mb-12">
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-4">
            {/* Search */}
            <div className="relative w-full sm:flex-1">
              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-[#FF8A2A] opacity-70 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search for delicious food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[56px] bg-white rounded-full pl-14 pr-6 text-[15px] font-medium text-[#2D2D2D] placeholder-[#6B6B6B]/50 border border-[#F4D8C3]/70 shadow-[0_2px_12px_rgba(0,0,0,0.03)] outline-none transition-all duration-300 focus:border-[#FF8A2A] focus:shadow-[0_4px_24px_rgba(255,138,42,0.12)] focus:ring-4 focus:ring-[#FF8A2A]/10"
              />
            </div>
            {/* Veg filter chip */}
            <label
              className={`flex items-center gap-2.5 cursor-pointer h-[56px] px-6 rounded-full border text-sm font-bold transition-all duration-300 select-none shrink-0 ${
                isVegOnly
                  ? "bg-green-600 text-white border-green-600 shadow-[0_4px_16px_rgba(22,163,74,0.25)]"
                  : "bg-white text-[#2D2D2D] border-[#F4D8C3]/70 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-[#FF8A2A]/40 hover:shadow-[0_4px_16px_rgba(255,138,42,0.08)]"
              }`}
            >
              <Leaf size={16} className={isVegOnly ? "text-white" : "text-green-600"} />
              <span>Veg Only</span>
              <input
                type="checkbox"
                className="sr-only"
                checked={isVegOnly}
                onChange={() => setIsVegOnly(!isVegOnly)}
              />
            </label>
          </div>
        </div>

        {/* ── Menu Categories ── */}
        <div className="flex flex-col gap-10">
          {validSections.map((card, index) => {
            const section = card.card.card;
            let filteredItems = section?.itemCards || [];

            if (searchQuery) {
              filteredItems = filteredItems.filter((item) =>
                item?.card?.info?.name
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase())
              );
            }

            if (isVegOnly) {
              filteredItems = filteredItems.filter(
                (item) =>
                  item?.card?.info?.itemAttribute?.vegClassifier === "VEG" ||
                  item?.card?.info?.isVeg
              );
            }

            if (filteredItems.length === 0) return null;

            return (
              <RestaurantCategory
                key={index}
                section={{ ...section, itemCards: filteredItems }}
                defaultOpen={index === 0}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ─── Category Accordion ─── */
const RestaurantCategory = ({ section, defaultOpen }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-[#F4D8C3]/40 overflow-hidden transition-shadow duration-300 hover:shadow-[0_4px_28px_rgba(0,0,0,0.05)]">
      {/* Accordion header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-7 py-6 md:px-10 cursor-pointer transition-colors duration-200 hover:bg-[#FFF8F3]/60 focus:outline-none group"
      >
        <h3 className="text-xl md:text-[22px] font-bold text-[#2D2D2D] tracking-tight flex items-center gap-3">
          {section?.title}
          <span className="text-xs font-bold text-[#FF8A2A] bg-[#FFE7D2] px-3 py-1 rounded-full">
            {section?.itemCards?.length}
          </span>
        </h3>
        <div
          className={`p-2 rounded-full transition-all duration-300 ${
            isOpen
              ? "bg-[#FFE7D2] rotate-180"
              : "bg-[#FFF8F3] group-hover:bg-[#FFE7D2]/60"
          }`}
        >
          <ChevronDown
            size={22}
            className={`transition-colors duration-300 ${
              isOpen ? "text-[#FF8A2A]" : "text-[#6B6B6B]"
            }`}
          />
        </div>
      </button>

      {/* Accordion body */}
      {isOpen && (
        <div className="px-4 md:px-8 pb-4">
          {section?.itemCards?.map((item, i) => (
            <MenuItem key={i} item={item} sectionTitle={section?.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
