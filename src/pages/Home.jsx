import RestaurantCard, { withVegLabel } from "../components/restaurant/RestaurantCard.jsx";
import { useEffect, useState, useContext } from "react";
import Shimmer from "../components/common/Shimmer.jsx";
import { Link } from "react-router-dom";
import useOnlineStatus from "../hooks/useOnlineStatus.js";
import {UserContext} from "../utils/UserContext/UserContext.js";

const Home = () => {
  // state variable - superpowerful variable
  const [listofRestaurant, setListofrestaurant] = useState([]); // destructure
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const RestaurantCardWithVegLabel = withVegLabel(RestaurantCard); // HOC call to get new component with veg label to display pure veg restaurant
  const { setUserName } = useContext(UserContext);
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    fetch(
      "http://localhost:3000/api/restaurants"
      //  "https://raw.githubusercontent.com/namastedev/namaste-react/refs/heads/main/swiggy-api"
    )
      .then((res) => res.json())

      .then((data) => {
        // promise chainging to get data

        // The API returns an array directly
        let resData = null;

        // If data is already an array, use it directly
        if (Array.isArray(data)) {
          // Transform flat structure to match expected format with 'info' wrapper
          resData = data.map((restaurant) => ({
            info: {
              id: restaurant.id,
              name: restaurant.name,
              cloudinaryImageId: restaurant.imageUrl,
              avgRating: restaurant.rating,
              cuisines: restaurant.cuisines || [],
              costForTwo: restaurant.costForTwo,
              sla: {
                slaString: restaurant.deliveryTime
                  ? `${restaurant.deliveryTime} mins`
                  : "Unknown",
              },
              veg: restaurant?.veg || false,
              isOpen: restaurant.isOpen,
            },
          }));
        } else {
          // Try multiple paths to find the restaurants array (for Swiggy API format)
          resData =
            data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants;

          // If not found, try direct restaurants property
          if (!resData) {
            resData = data?.restaurants;
          }

          // If still not found, try data.cards[4] alternative structure
          if (!resData) {
            resData = data?.data?.cards[4]?.card?.card?.restaurants;
          }
        }

        if (resData && Array.isArray(resData)) {
          setListofrestaurant(resData);
          setFilteredRestaurant(resData);
        } else {
          console.error("Could not find restaurants data in response");
          console.log("Raw data object keys:", Object.keys(data));
        }
      })
      .catch((err) => console.log(err));
    // console.log("Filtered Restaurant:", filteredRestaurant);
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
    <div className="body bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="bg-white shadow-md sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Search Section */}
            <div className="flex gap-2">
              <input
                type="text"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                placeholder="Search restaurants..."
              />
              <button
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md"
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

            {/* Top Rated Button */}
            <div className="flex justify-center">
              <button
                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                onClick={() => {
                  const filteredList = filteredRestaurant?.filter(
                    (res) => res?.info?.avgRating > 4
                  );
                  setListofrestaurant(filteredList);
                }}
              >
                ⭐ Top Rated
              </button>
            </div>

            {/* User Name Section */}
            {/* <div className="flex justify-end">
              <div className="flex gap-2 items-center">
                <label className="font-semibold text-gray-700">User:</label>
                <input
                  type="text"
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Your Name"
                  value={loggedInUser}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          🍽️ Popular Restaurants
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRestaurant?.map((restaurant) => (
            <Link
              key={String(restaurant?.info?.id)}
              to={`/restaurants/${restaurant?.info?.id}`} // dynamic routing
              className="no-underline"
            >
              {/* if restaurant is pure veg then add pure veg label to it --   info?.isVeg ===true */}
              {restaurant?.info?.veg === true ? (
                <RestaurantCardWithVegLabel resData={restaurant} />
              ) : (
                <RestaurantCard resData={restaurant} />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
