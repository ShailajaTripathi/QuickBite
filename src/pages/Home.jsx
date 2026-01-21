import RestaurantCard, {
  withVegLabel,
} from "../components/restaurant/RestaurantCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants } from "../store/restaurantSlice.js";

import { useEffect, useState } from "react";
import Shimmer from "../components/common/Shimmer.jsx";
import { Link } from "react-router-dom";
import useOnlineStatus from "../hooks/useOnlineStatus.js";
const Home = () => {
  const [listofRestaurant, setListofrestaurant] = useState([]); // destructure
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searched, setSearched] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(false);
  const RestaurantCardWithVegLabel = withVegLabel(RestaurantCard); // HOC call to get new component with veg label to display pure veg restaurant

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, []);
  const { list, loading, error } = useSelector((state) => state.restaurants);

  useEffect(() => {
    if (list?.length) {
      setListofrestaurant(list);
      setFilteredRestaurant(list);
    }
  }, [list]);
  useEffect(() => {
    if (!searchText) {
      setFilteredRestaurant(listofRestaurant);
      return;
    }

    const filtered = listofRestaurant?.filter((res) =>
      res?.info?.name.toLowerCase().includes(searchText.toLowerCase()),
    );

    setFilteredRestaurant(filtered);
  }, [searchText]);

  const onlineStatus = useOnlineStatus(); //custom hook call to check online status

  if (onlineStatus === false) {
    return (
      <h1>
        Looks like you're offline !! Please check your internet connection...
      </h1>
    );
  }
  if (loading) return <Shimmer />;
  if (error) return <h1>Error loading restaurants</h1>;

  return (
    <div className="body bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="bg-white shadow-md sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Search Section */}
            <div className="flex gap-2">
              <div className="relative flex items-center flex-1">
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Search restaurants..."
                />

                {/* Clear "X" Button */}
                {searchText && (
                  <button
                    onClick={() => setSearchText("")}
                    className="absolute right-3 text-gray-500 hover:text-gray-700 focus:outline-none text-xl font-bold"
                  >
                    ×
                  </button>
                )}
              </div>
              {searchText && (
                <button
                  className="px-6 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-400 transition-colors shadow-md"
                  onClick={() => {
                    const filteredRestaurant = listofRestaurant?.filter((res) =>
                      res?.info?.name
                        .toLowerCase()
                        .includes(searchText.toLowerCase()),
                    );
                    setSearched(true);
                    setFilteredRestaurant(filteredRestaurant);
                    setSearchText("");
                  }}
                >
                  <i className="fa-solid fa-search"></i> Search
                </button>
              )}
              {(searched || ratingFilter) && (
                <button
                  className="px-2 py-2 border-green-500 font-semibold rounded-lg transition-colors shadow-md"
                  onClick={() => {
                    setRatingFilter(false);
                    setSearchText("");
                    setFilteredRestaurant(listofRestaurant);
                  }}
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Top Rated Button */}
            <div className="flex justify-center">
              {!ratingFilter && (
                <button
                  // disabled={!filteredRestaurant?.length}
                  className="px-6 py-2 border rounded-lg font-semibold hover:shadow-lg transition-all shadow-md"
                  onClick={() => {
                    setRatingFilter(!ratingFilter);

                    // 1. Filter the restaurants (keep only 4.0+)
                    const topRated = filteredRestaurant?.filter(
                      (res) => res?.info?.avgRating >= 4,
                    );

                    // 2. Sort them in descending order (highest rating first)
                    const sortedList = [...topRated].sort((a, b) => {
                      return b?.info?.avgRating - a?.info?.avgRating;
                    });

                    // 3. Update the state
                    setFilteredRestaurant(sortedList);
                  }}
                >
                  <i className="fa-solid fa-utensils"></i> Top Rated Dining
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          <i className="fa-solid fa-plate-wheat"></i> Restaurants near you{" "}
          <span className="text-gray-500"> ({filteredRestaurant?.length})</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRestaurant.length ? (
            filteredRestaurant?.map((restaurant) => (
              <Link
                key={restaurant?.info?.id}
                to={`/restaurants/${restaurant?.info?.id}`}
                className="no-underline"
              >
                {/* if restaurant is pure veg then add pure veg label to it --   info?.isVeg ===true */}
                {restaurant?.info?.veg === true ? (
                  <RestaurantCardWithVegLabel list={restaurant} />
                ) : (
                  <RestaurantCard list={restaurant} />
                )}
              </Link>
            ))
          ) : (
            <div className="place-self-center text-center text-gray-600 mt-10">
              <h2 className="text-2xl font-semibold ">
                No restaurants found 🍽️
              </h2>
              <p className="mt-2">Try a different search or clear filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
