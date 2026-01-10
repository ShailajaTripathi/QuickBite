import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../store/cartSlice.js";
import { itemImageMap } from "../../utils/constant.js";
import { MENU_IMAGE_URL } from "../../utils/constant.js";

const ItemList = ({ data }) => {

  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  const handleAdd = (e, item) => {
    e.stopPropagation();
    dispatch(addItem(item));
    // Indicate item was added
    // Reset back to "Add to Cart" after 2 seconds

    // setTimeout(() => setAddedItemId(null), 2000);
  };

  console.log("dataaaa itemlist", data);

  // Dish-specific image URLs with real food pictures - high quality

  // Fallback placeholder image
  const FALLBACK_IMAGE =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='100'%3E%3Crect fill='%23f0f0f0' width='150' height='100'/%3E%3Ctext x='50%25' y='50%25' font-size='12' fill='%23999' text-anchor='middle' dy='.3em' font-family='Arial'%3EFood Image%3C/text%3E%3C/svg%3E";

  // Function to get image URL with smart fallback
  const getImageUrl = (itemId, imageIdFromApi) => {
    // Priority 1: Always use the mapped reliable image
    // This ensures all images work regardless of what's in the API
    if (itemId && itemImageMap[itemId]) {
      return itemImageMap[itemId];
    }

    // Priority 2: If API has a URL, try it (but might fail due to CORS)
    if (
      imageIdFromApi &&
      typeof imageIdFromApi === "string" &&
      imageIdFromApi.startsWith("http")
    ) {
      // Return a proxy or the URL as-is - browser will handle CORS
      return imageIdFromApi;
    }

    // Priority 3: Construct from Swiggy CDN
    if (
      imageIdFromApi &&
      typeof imageIdFromApi === "string" &&
      !imageIdFromApi.startsWith("http")
    ) {
      return MENU_IMAGE_URL + imageIdFromApi;
    }

    // Return fallback SVG
    return FALLBACK_IMAGE;
  };

  return (
    <div className="divide-y divide-gray-200">
      {data?.map((item) => {
        // checks if items is already in cart
        const isItemInCart = cartItems.some(
          (cartItem) => cartItem?.card?.info?.id === item?.card?.info?.id
        );

        return (
          <div
            key={item?.card?.info?.id || Math.random()}
            className="p-4 hover:bg-white transition-colors flex justify-between gap-4"
          >
            {/* Left Side - Content */}
            <div className="flex-1 min-w-0">
              {/* Item Name and Price */}
              <div className="flex items-baseline gap-2 mb-2">
                <h4 className="font-bold text-gray-800 text-lg">
                  {item?.card?.info?.name}
                </h4>
                <span className="text-green-600 font-semibold">
                  ₹
                  {item?.card?.info?.price
                    ? item?.card?.info?.price / 100
                    : item?.card?.info?.defaultPrice / 100}
                </span>
              </div>

              {/* Veg/Non-Veg Indicator */}
              {item?.card?.info?.isVeg !== undefined && (
                <div className="mb-2">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                      item?.card?.info?.isVeg
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item?.card?.info?.isVeg ? "🌱 Veg" : "🍗 Non-Veg"}
                  </span>
                </div>
              )}

              {/* Description */}
              <p className="text-sm text-gray-600 line-clamp-2">
                {item?.card?.info?.description}
              </p>
            </div>

            {/* Right Side - Image and Button */}
            <div className="flex-shrink-0 relative">
              <img
                src={getImageUrl(
                  item?.card?.info?.id,
                  item?.card?.info?.imageId
                )}
                alt={item?.card?.info?.name}
                onError={(e) => {
                  e.target.src = FALLBACK_IMAGE;
                  e.target.style.backgroundColor = "#f0f0f0";
                }}
                className="w-28 h-24 rounded-lg object-cover shadow-md"
                loading="lazy"
                crossOrigin="anonymous"
              />
              {/* ADD Button */}
              <button
                onClick={(e) => handleAdd(e, item)}
                disabled={isItemInCart}
                className={`absolute -bottom-3 right-0 px-4 py-1 rounded-lg font-bold shadow-lg transition-all
    ${
      isItemInCart
        ? "bg-green-600 text-white border-2 border-green-600 cursor-not-allowed"
        : "bg-white text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-white"
    }
  `}
              >
                {isItemInCart ? "✓ ADDED" : "ADD"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
