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
    <div className="flex flex-col md:flex-row justify-between border-b border-neutral-100 last:border-0 py-8 group hover:bg-[#fcefe7]/40 transition-all duration-300 px-4 md:px-6 rounded-2xl md:hover:-translate-y-1 md:hover:shadow-[0_8px_30px_rgba(254,134,45,0.08)]">
      {/* Item Details */}
      <div className="md:w-8/12 pr-6">
        <div className="flex items-center gap-3 mb-2 text-lg">
          {/* Veg/Non-veg Indicator - keeping green/red here as requested */}
          {(info?.itemAttribute?.vegClassifier || typeof info?.isVeg === "boolean") && (
            <span
              className={`w-4 h-4 rounded-sm border-[1.5px] shrink-0 flex items-center justify-center ${isVeg ? "border-green-600" : "border-red-600"}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isVeg ? "bg-green-600" : "bg-red-600"}`}></span>
            </span>
          )}
          <h4 className="font-bold text-neutral-800 text-lg md:text-xl group-hover:text-[#fe862d] transition-colors duration-300">
            {info?.name}
          </h4>
        </div>

        {/* Price */}
        {price && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-neutral-900 font-extrabold text-base md:text-lg">
              ₹{(price / 100).toFixed(2)}
            </span>
          </div>
        )}

        {/* Description */}
        {info?.description && (
          <p className="text-neutral-500 text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-3">
            {info?.description}
          </p>
        )}
      </div>

      {/* Item Image & Add Button */}
      <div className="md:w-4/12 shrink-0 relative mt-6 md:mt-0 flex flex-col items-center justify-start w-full md:items-end">
        {info?.imageId ? (
          <div className="relative mb-4 md:mb-0">
            <img
              className="w-36 h-36 md:w-40 md:h-40 object-cover rounded-[1.25rem] shadow-[0_12px_24px_rgba(0,0,0,0.08)] border border-neutral-100 group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300"
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${info?.imageId}`}
              alt={info?.name}
            />
            <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-32 h-11 z-20 transition-all duration-300">
              {cartCount > 0 ? (
                <div className="w-full h-full bg-white text-[#fe862d] font-bold rounded-xl shadow-[0_6px_15px_rgba(254,134,45,0.25)] border-2 border-[#fe862d] flex items-center justify-between px-3 overflow-hidden">
                   <button 
                     onClick={handleRemoveItem} 
                     className="text-neutral-400 hover:text-[#fe862d] hover:bg-[#fe862d]/10 p-1.5 rounded-lg transition-colors active:scale-95"
                   >
                     <Minus size={18} strokeWidth={3} />
                   </button>
                   <span className="text-[#fe862d] text-lg leading-none font-extrabold">{cartCount}</span>
                   <button 
                     onClick={handleAddItem} 
                     className="text-neutral-400 hover:text-[#fe862d] hover:bg-[#fe862d]/10 p-1.5 rounded-lg transition-colors active:scale-95"
                   >
                     <Plus size={18} strokeWidth={3} />
                   </button>
                </div>
              ) : (
                <button
                  className="w-full h-full bg-[#fe862d] text-white font-extrabold rounded-xl shadow-[0_6px_15px_rgba(254,134,45,0.35)] hover:bg-[#e5721c] hover:shadow-[0_10px_25px_rgba(254,134,45,0.55)] active:scale-95 active:shadow-[0_5px_12px_rgba(254,134,45,0.35)] transition-all duration-200 uppercase text-sm tracking-widest flex items-center justify-center"
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
               <div className="w-32 h-11 bg-white text-[#fe862d] font-bold rounded-xl shadow-[0_6px_15px_rgba(254,134,45,0.25)] border-2 border-[#fe862d] flex items-center justify-between px-3">
                 <button 
                   onClick={handleRemoveItem} 
                   className="text-neutral-400 hover:text-[#fe862d] hover:bg-[#fe862d]/10 p-1.5 rounded-lg transition-colors active:scale-95"
                 >
                   <Minus size={18} strokeWidth={3} />
                 </button>
                 <span className="text-[#fe862d] text-lg leading-none font-extrabold">{cartCount}</span>
                 <button 
                   onClick={handleAddItem} 
                   className="text-neutral-400 hover:text-[#fe862d] hover:bg-[#fe862d]/10 p-1.5 rounded-lg transition-colors active:scale-95"
                 >
                   <Plus size={18} strokeWidth={3} />
                 </button>
               </div>
            ) : (
              <button
                className="w-32 h-11 bg-[#fe862d] text-white font-extrabold rounded-xl shadow-[0_6px_15px_rgba(254,134,45,0.35)] hover:bg-[#e5721c] hover:shadow-[0_10px_25px_rgba(254,134,45,0.55)] active:scale-95 active:shadow-[0_5px_12px_rgba(254,134,45,0.35)] transition-all duration-200 uppercase text-sm tracking-widest flex items-center justify-center"
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
