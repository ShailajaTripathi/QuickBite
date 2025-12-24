import RestaurantCard, { withVegLabel } from "./RestaurantCard";
import resList from "../Api";
import { useEffect, useState,useContext } from "react";
import Shimmer from "./Shimmer";
import {Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext/UserContext.js";

const Body = () => {
  // state variable - superpowerful variable
  const [listofRestaurant, setListofrestaurant] = useState([]);  // destructure
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const RestaurantCardWithVegLabel = withVegLabel(RestaurantCard); // HOC call to get new component with veg label to display pure veg restaurant
  const {setUserName}=useContext(UserContext);
  const {loggedInUser}=useContext(UserContext);
  useEffect(() => {
    fetch(
      '/api/restaurant'
      // "https://raw.githubusercontent.com/namastedev/namaste-react/refs/heads/main/swiggy-api"
      //"https://swiggy-api-4c740.web.app/swiggy-api.json"
      //"https://corsproxy.io/https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.198909&lng=77.7068926&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    )
      .then((res) => res.json())

      .then((data) => {  // promise chainging to get data
        const resData =
          data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants;
        setListofrestaurant(resData);
        setFilteredRestaurant(resData);

        console.log("lsit", resData);
      })
      .catch((err) => console.log(err));
  }, []);

  const onlineStatus = useOnlineStatus(); //custom hook call to check online status

  if (onlineStatus === false) { 
    return (
      <h1>
        Looks like you're offline !! Please check your internet connection...
      </h1>
    );
  }

  return listofRestaurant?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">

        <div className="search m-4 p-4">  
          <input
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            className="search-box border border-black-500 p-1.5 hover:border-green-500 focus:outline-none"
            placeholder="Search your favourite restaurant"
          />

          <button
            className="px-4 py-2 bg-green-100 m-4 rounded-lg hover:bg-green-300"
            onClick={() => {
              const filteredRestaurant = listofRestaurant?.filter((res) =>
                res?.info?.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filteredRestaurant);
            
            }}
          >
            Search
          </button>

        </div>

        <div className="search m-4 p-4 flex items-center">
          <button
            className="filter-btn px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-300"
            onClick={() => {
              const filteredList = filteredRestaurant?.filter(
                (res) => res?.info?.avgRating > 4
              );

              setListofrestaurant(filteredList);
            }}
          >
            Top Rated Restaurant
          </button>
          <div className="mx-4">
            <label>User Name: </label>
            <input type="text"  className="border border-black-500 p-1.5 hover:border-green-500 focus:outline-none"
             placeholder="Update User Name" value={loggedInUser}  onChange={(e)=>{setUserName(e.target.value)}}/>
          </div>
        </div>
      </div>
      <div className="res-container flex flex-wrap px-4 mx-4">
        {filteredRestaurant?.map((restaurant, index) => (
          <Link  
            key={
              restaurant?.info?.id
                ? String(restaurant?.info?.id)
                : `restaurant-${index}`
            }
            to={`/restaurants/${restaurant?.info?.id}`}
          >
            {/* if restaurant is pure veg then add pure veg label to it --   info?.veg ===true */}
            {restaurant?.info?.veg ? (
              <RestaurantCardWithVegLabel
                key={
                  restaurant?.info?.id
                    ? String(restaurant?.info?.id)
                    : `restaurant-${index}`
                }
                resData={restaurant}
              />
            ) : (
              <RestaurantCard
                key={
                  restaurant?.info?.id
                    ? String(restaurant?.info?.id)
                    : `restaurant-${index}`
                }
                resData={restaurant} 
                // key={restaurant?.info?.id || index}
                //   key={restaurant?.info?.id} // only key is very usefiul to change or update dom in every render
                // name={restaurant?.info?.name}
                // cuisines={restaurant?.info?.cuisines.join(",")}
                // rating={restaurant?.info?.avgRating}
                // offers={restaurant?.info?.costForTwo}
                // image={restaurant?.info?.cloudinaryImageId}
                // deliveryTime={restaurant?.info?.sla?.slaString}
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Body;
