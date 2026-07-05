import React from "react";

const MenuItem = ({ item, sectionTitle, onAddItem }) => {
  const info = item?.card?.info;
  const price = info?.price || info?.defaultPrice;
  const isVeg = info?.itemAttribute?.vegClassifier === "VEG" || info?.isVeg;

  return (
    
    <div className="flex flex-col md:flex-row justify-between border-b border-orange-200/40 last:border-0 py-10 group">
      {/* Item Details */}
      <div className="md:w-8/12 pr-6">
        <div className="flex items-center gap-3 mb-3 text-lg">
          {/* Veg/Non-veg Indicator */}
          {(info?.itemAttribute?.vegClassifier ||
            typeof info?.isVeg === "boolean") && (
            <span
              className={`w-5 h-5 rounded-sm border-2 shrink-0 flex items-center justify-center ${isVeg ? "border-green-600" : "border-red-600"}`}
            >
              <span
                className={`w-2 h-2 rounded-full ${isVeg ? "bg-green-600" : "bg-red-600"}`}
              ></span>
            </span>
          )}
          <h4 className="font-bold text-gray-800 group-hover:text-orange-500 transition-colors">
            {info?.name}
          </h4>
        </div>

        {/* Price */}
        {price && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-900 font-semibold text-lg">
              ₹{price / 100}
            </span>
          </div>
        )}

        {/* Description */}
        {info?.description && (
          <p className="text-gray-500 text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-3">
            {info?.description}
          </p>
        )}
      </div>

      {/* Item Image & Add Button */}
      <div className="md:w-4/12 shrink-0 relative mt-4 md:mt-0 flex flex-col items-center justify-start w-full md:items-end">
        {info?.imageId ? (
          <div className="relative mb-6 md:mb-0">
            <img
              className="w-35 h-35 md:w-39 md:h-36 object-cover rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-orange-200"
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${info?.imageId}`}
              alt={info?.name}
            />
            <button
              className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-white text-green-600 font-extrabold px-8 py-2 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.15)] border border-green-100 uppercase text-md hover:shadow-lg hover:bg-green-50 active:scale-95 transition-all duration-200 z-20 w-11/12 tracking-wide flex items-center justify-center"
              onClick={() => onAddItem(info)}
            >
              ADD{" "}
              <span className="text-xl leading-none ml-1 mb-0.5">+</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center md:justify-end h-full w-full">
            <button
              className="bg-white text-green-600 font-extrabold px-10 py-2.5 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-green-100 uppercase text-md hover:shadow-xl hover:bg-green-50 active:scale-95 transition-all duration-200 flex items-center tracking-wide"
              onClick={() => onAddItem(info)}
            >
              ADD
              <span className="text-xl leading-none ml-1 mb-0.5">+</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItem;
