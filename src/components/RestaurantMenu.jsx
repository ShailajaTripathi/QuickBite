import { useState } from "react";
import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { useParams } from "react-router";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  // const [showItems, setShowItems] = useState(false);
  const [showIndex, setShowIndex] = useState(0);

  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwo } = resInfo?.[2]?.card?.card?.info;
  const { itemCards } =
    resInfo?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

  //console.log("resInfo[2]",resInfo?.[2]?.card?.card?.info)
  // console.log(resInfo?.[4]?.groupedCard ?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards)
  //[2]
  //console.log(menuList?.[0]?.card?.info);

  const categories =
    resInfo?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="menu text-center">
      <h1 className="text-center text-3xl p-2 text-green-600">{name}</h1>
      <p className="text-center text-green-600">
        {cuisines.join(" , ")} - ₹{costForTwo} for Two{" "}
      </p>

      {/*--- this is controlled component----- */}
      {/* categories accordians */}

      {categories.map((category, index) => (
        <RestaurantCategory
          key={category?.card?.card?.categoryId}
          category={category?.card?.card}
          showItems={index === showIndex} // Check if the current index matches the open accordion
          setShowIndex={
            () => setShowIndex(index === showIndex ? null : index) // Toggle logic
          }
        />
      ))}
      {/* <div className="menulist p-4 mx-auto max-w-4xl ">
        <h3 className="p-4 m-4 font-semibold"> ({categories?.length})</h3> */}
      {/* {
          itemCards?.map((menu, index) => (
            <div className="menu-item flex justify-between items-center border-b border-gray-300 py-4 hover:bg-gray-200" key={menu?.card?.info?.id || index}>
              <div className="flex-1 p-4">
                <h2 className="text-lg font-bold">{menu?.card?.info?.name}</h2>
                <h3 className="text-md font-medium text-gray-700"> ₹ {menu?.card?.info?.defaultPrice / 100} </h3>
                <h4 className="text-sm text-green-600">
                  ★ {menu?.card?.info?.ratings?.aggregatedRating?.rating} (
                  {menu?.card?.info?.ratings?.aggregatedRating?.ratingCountV2})
                </h4> 
                <h3 className="text-sm text-gray-500">
                  {menu?.card?.info?.description}
                </h3>
              </div>
              <div className="flex-shronk-0">
                <img
                className="w-[250px] h-[150px] rounded-lg object-cover"
                  alt="menu-images"
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${menu?.card?.info?.imageId}`}
                />
              </div>
            </div>
          ))
        } */}
      {/* </div> */}
    </div>
  );
};

export default RestaurantMenu;
