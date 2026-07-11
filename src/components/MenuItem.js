import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItem } from "../utlis/cartSlice";
import { Minus, Plus } from "lucide-react";

const MenuItem = ({ item, sectionTitle }) => {
  const info = item?.card?.info;
  const price = info?.price || info?.defaultPrice;
  const isVeg = info?.itemAttribute?.vegClassifier === "VEG" || info?.isVeg;
  
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  const cartCount = cartItems.filter((cartItem) => cartItem.id === info?.id).length;

  const handleAddItem = () => {
    dispatch(addItemToCart({ ...info, section: sectionTitle }));
  };

  const handleRemoveItem = () => {
    dispatch(removeItem(info?.id));
  };

  return (
    <div className="flex flex-col md:flex-row justify-between border-b border-slate-100 last:border-0 py-8 group hover:bg-slate-50/50 transition-colors px-2 md:px-4 rounded-xl">
      {/* Item Details */}
      <div className="md:w-8/12 pr-6">
        <div className="flex items-center gap-3 mb-2 text-lg">
          {/* Veg/Non-veg Indicator */}
          {(info?.itemAttribute?.vegClassifier || typeof info?.isVeg === "boolean") && (
            <span
              className={`w-4 h-4 rounded-sm border-[1.5px] shrink-0 flex items-center justify-center ${isVeg ? "border-green-600" : "border-red-600"}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isVeg ? "bg-green-600" : "bg-red-600"}`}></span>
            </span>
          )}
          <h4 className="font-semibold text-gray-800 text-lg">
            {info?.name}
          </h4>
        </div>

        {/* Price */}
        {price && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-gray-900 font-bold text-base">
              ₹{(price / 100).toFixed(2)}
            </span>
          </div>
        )}

        {/* Description */}
        {info?.description && (
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
            {info?.description}
          </p>
        )}
      </div>

      {/* Item Image & Add Button */}
      <div className="md:w-4/12 shrink-0 relative mt-6 md:mt-0 flex flex-col items-center justify-start w-full md:items-end">
        {info?.imageId ? (
          <div className="relative mb-4 md:mb-0">
            <img
              className="w-32 h-32 md:w-36 md:h-36 object-cover rounded-2xl shadow-sm border border-slate-100"
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${info?.imageId}`}
              alt={info?.name}
            />
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-28 h-10 z-20">
              {cartCount > 0 ? (
                <div className="w-full h-full bg-white text-green-600 font-bold rounded-lg shadow-md border border-green-100 flex items-center justify-between px-3">
                   <button onClick={handleRemoveItem} className="text-gray-400 hover:text-green-600 p-1"><Minus size={18} strokeWidth={3} /></button>
                   <span className="text-green-600 text-lg leading-none">{cartCount}</span>
                   <button onClick={handleAddItem} className="text-green-600 hover:text-green-700 p-1"><Plus size={18} strokeWidth={3} /></button>
                </div>
              ) : (
                <button
                  className="w-full h-full bg-white text-green-600 font-bold rounded-lg shadow-md border border-slate-100 uppercase text-sm hover:shadow-lg active:scale-95 transition-all duration-200 tracking-wide flex items-center justify-center"
                  onClick={handleAddItem}
                >
                  ADD
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center md:justify-end h-full w-full">
            {cartCount > 0 ? (
               <div className="w-28 h-10 bg-white text-green-600 font-bold rounded-lg shadow-md border border-green-100 flex items-center justify-between px-3">
                 <button onClick={handleRemoveItem} className="text-gray-400 hover:text-green-600 p-1"><Minus size={18} strokeWidth={3} /></button>
                 <span className="text-green-600 text-lg leading-none">{cartCount}</span>
                 <button onClick={handleAddItem} className="text-green-600 hover:text-green-700 p-1"><Plus size={18} strokeWidth={3} /></button>
               </div>
            ) : (
              <button
                className="w-28 h-10 bg-white text-green-600 font-bold rounded-lg shadow-md border border-slate-100 uppercase text-sm hover:shadow-lg active:scale-95 transition-all duration-200 tracking-wide flex items-center justify-center"
                onClick={handleAddItem}
              >
                ADD
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItem;
