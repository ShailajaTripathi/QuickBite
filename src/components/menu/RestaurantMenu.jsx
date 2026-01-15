import { useState } from "react";   //named export
import Shimmer from "../common/Shimmer";  // default import 
import useRestaurantMenu from "../../hooks/useRestaurantMenu";
import { useParams } from "react-router-dom";
import RestaurantCategory from "./RestaurantCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faUtensils } from "@fortawesome/free-solid-svg-icons";          

  const RestaurantMenu = () => {
  // const [showItems, setShowItems] = useState(false);
  const [showIndex, setShowIndex] = useState(0);
  const { resId } = useParams(); 
  const resInfo = useRestaurantMenu(resId);

  if (resInfo === null) return <Shimmer />; // loading state 

  
  // Extract restaurant info from card 2
  const restaurantInfo = resInfo?.[2]?.card?.card;
  const name = restaurantInfo?.name || "Restaurant";
  const cuisines = restaurantInfo?.cuisines || [];
  const costForTwo = restaurantInfo?.costForTwo || 0;

  const categories =
    resInfo?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="menu bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Restaurant Header */}
      <div className="bg-white shadow-lg sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">{name}</h1>
          <div className="flex items-center gap-2 text-gray-600 text-lg">
            <span className="font-semibold"> <FontAwesomeIcon icon={faUtensils}/> {cuisines.join(", ")}</span>
            <span className="mx-2">•</span>
            <span className="font-semibold"> <FontAwesomeIcon icon={faWallet}/> ₹{costForTwo} for Two</span>
          </div>
        </div>
      </div>

      {/* Menu Categories */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6"><i className="fa-solid fa-list"></i> Menu ({categories?.length})</h2>
        {categories?.map((category, index) => (
          <RestaurantCategory
            key={category?.card?.card?.categoryId}
            category={category?.card?.card}
            showItems={index === showIndex}
            setShowIndex={
              () => setShowIndex(index === showIndex ? null : index)
            }
          />
        ))}
      </div>
    </div>
  );
};
export default RestaurantMenu;
