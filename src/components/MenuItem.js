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
  const cartCount = cartItems.filter(
    (cartItem) => cartItem.id === info?.id
  ).length;

  const handleAddItem = () => {
    dispatch(addItemToCart({ ...info, section: sectionTitle }));
  };

  const handleRemoveItem = () => {
    dispatch(removeItem(info?.id));
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start py-8 border-b border-[#F4D8C3]/40 last:border-b-0 group transition-all duration-300 hover:bg-[#FFF8F3]/50 rounded-2xl px-2 md:px-4">
      {/* ── Left: Details ── */}
      <div className="md:w-[65%] pr-4 md:pr-6 min-w-0">
        {/* Veg / Non-veg badge */}
        <div className="flex items-center gap-3 mb-3">
          {(info?.itemAttribute?.vegClassifier ||
            typeof info?.isVeg === "boolean") && (
            <span
              className={`w-[18px] h-[18px] rounded-[4px] border-[1.8px] flex items-center justify-center shrink-0 ${
                isVeg ? "border-green-600" : "border-red-500"
              }`}
            >
              <span
                className={`w-[7px] h-[7px] rounded-full ${
                  isVeg ? "bg-green-600" : "bg-red-500"
                }`}
              />
            </span>
          )}
          <h4 className="font-bold text-[#2D2D2D] text-[17px] md:text-lg leading-snug group-hover:text-[#FF8A2A] transition-colors duration-300">
            {info?.name}
          </h4>
        </div>

        {/* Price */}
        {price && (
          <p className="text-[#2D2D2D] font-extrabold text-base mb-4">
            ₹{(price / 100).toFixed(2)}
          </p>
        )}

        {/* Description */}
        {info?.description && (
          <p className="text-[#6B6B6B] text-sm leading-relaxed line-clamp-2 md:line-clamp-3 max-w-lg">
            {info?.description}
          </p>
        )}
      </div>

      {/* ── Right: Image & Cart Controls ── */}
      <div className="md:w-[28%] mt-5 md:mt-0 flex flex-col items-center">
        {info?.imageId ? (
          <div className="relative pb-6">
            <img
              className="w-32 h-32 md:w-[136px] md:h-[136px] object-cover rounded-[1.25rem] shadow-[0_6px_20px_rgba(0,0,0,0.08)] border border-[#F4D8C3]/50 transition-transform duration-500 group-hover:scale-[1.02]"
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${info?.imageId}`}
              alt={info?.name}
            />
            {/* Cart button overlapping image bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-[112px]">
              {cartCount > 0 ? (
                <div className="h-10 bg-white rounded-xl border-2 border-[#FF8A2A] shadow-[0_4px_16px_rgba(255,138,42,0.2)] flex items-center justify-between px-2">
                  <button
                    onClick={handleRemoveItem}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-[#6B6B6B] hover:text-[#FF8A2A] hover:bg-[#FFE7D2]/60 transition-all active:scale-90"
                  >
                    <Minus size={16} strokeWidth={3} />
                  </button>
                  <span className="text-[#FF8A2A] font-extrabold text-base">
                    {cartCount}
                  </span>
                  <button
                    onClick={handleAddItem}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-[#6B6B6B] hover:text-[#FF8A2A] hover:bg-[#FFE7D2]/60 transition-all active:scale-90"
                  >
                    <Plus size={16} strokeWidth={3} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAddItem}
                  className="w-full h-10 bg-white text-[#FF8A2A] font-extrabold text-sm uppercase tracking-wider rounded-xl border-2 border-[#FF8A2A] shadow-[0_4px_16px_rgba(255,138,42,0.2)] hover:bg-[#FF8A2A] hover:text-white active:scale-95 transition-all duration-200"
                >
                  ADD
                </button>
              )}
            </div>
          </div>
        ) : (
          /* No image: standalone cart button */
          <div className="flex items-center justify-center md:justify-end h-full w-full md:w-auto">
            {cartCount > 0 ? (
              <div className="h-10 w-[120px] bg-white rounded-xl border-2 border-[#FF8A2A] shadow-[0_4px_16px_rgba(255,138,42,0.2)] flex items-center justify-between px-2">
                <button
                  onClick={handleRemoveItem}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-[#6B6B6B] hover:text-[#FF8A2A] hover:bg-[#FFE7D2]/60 transition-all active:scale-90"
                >
                  <Minus size={16} strokeWidth={3} />
                </button>
                <span className="text-[#FF8A2A] font-extrabold text-base">
                  {cartCount}
                </span>
                <button
                  onClick={handleAddItem}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-[#6B6B6B] hover:text-[#FF8A2A] hover:bg-[#FFE7D2]/60 transition-all active:scale-90"
                >
                  <Plus size={16} strokeWidth={3} />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddItem}
                className="w-[120px] h-10 bg-white text-[#FF8A2A] font-extrabold text-sm uppercase tracking-wider rounded-xl border-2 border-[#FF8A2A] shadow-[0_4px_16px_rgba(255,138,42,0.2)] hover:bg-[#FF8A2A] hover:text-white active:scale-95 transition-all duration-200"
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
