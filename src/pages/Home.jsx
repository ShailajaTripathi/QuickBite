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
  const [listofRestaurant, setListofrestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searched, setSearched] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(false);
  const RestaurantCardWithVegLabel = withVegLabel(RestaurantCard);

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
      res?.info?.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurant(filtered);
  }, [searchText]);

  // Logic for the Dropdown
  const handleSortChange = (e) => {
    const value = e.target.value;

    if (value === "top-rated") {
      setRatingFilter(true);
      // 1. Filter the restaurants (keep only 4.0+)
      const topRated = listofRestaurant?.filter(
        (res) => res?.info?.avgRating >= 4
      );
      // 2. Sort them in descending order
      const sortedList = [...topRated].sort((a, b) => {
        return b?.info?.avgRating - a?.info?.avgRating;
      });
      setFilteredRestaurant(sortedList);
    } else {
      // Default / All Restaurants
      setRatingFilter(false);
      setFilteredRestaurant(listofRestaurant);
    }
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return (
      <h1 className="text-center mt-20 font-bold">
        Looks like you're offline !! Please check your internet connection...
      </h1>
    );
  }

  if (loading) return <Shimmer />;
  if (error) return <h1 className="text-center mt-20 text-red-500">Error loading restaurants</h1>;

  return (
    <div className="body bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <div className="bg-white shadow-md sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            
            {/* Left Side: Search & Dropdown Stacked */}
            <div className="flex flex-col gap-4 w-full md:w-1/2">
              {/* Search Bar */}
              <div className="flex gap-2">
                <div className="relative flex items-center flex-1">
                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full px-4 py-2 pr-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                    placeholder="Search restaurants..."
                  />
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
                    className="px-6 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors shadow-md"
                    onClick={() => {
                      const filtered = listofRestaurant?.filter((res) =>
                        res?.info?.name.toLowerCase().includes(searchText.toLowerCase())
                      );
                      setSearched(true);
                      setFilteredRestaurant(filtered);
                      setSearchText("");
                    }}
                  >
                    Search
                  </button>
                )}
              </div>

              {/* NEW Dropdown: Placed below the search bar */}
              <div className="flex items-center gap-3">
                <select
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg font-semibold bg-white hover:border-green-500 cursor-pointer outline-none transition-all shadow-sm"
                  onChange={handleSortChange}
                  value={ratingFilter ? "top-rated" : "default"}
                >
                  <option value="default">Order By: Default</option>
                  <option value="top-rated">Top Rating (4.0+)</option>
                </select>

                {(searched || ratingFilter) && (
                  <button
                    className="text-sm text-red-500 hover:underline font-bold"
                    onClick={() => {
                      setRatingFilter(false);
                      setSearched(false);
                      setSearchText("");
                      setFilteredRestaurant(listofRestaurant);
                    }}
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          <i className="fa-solid fa-plate-wheat mr-2"></i> Restaurants near you
          <span className="text-gray-500 text-xl font-normal ml-2">
            ({filteredRestaurant?.length})
          </span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRestaurant.length ? (
            filteredRestaurant?.map((restaurant) => (
              <Link
                key={restaurant?.info?.id}
                to={`/restaurants/${restaurant?.info?.id}`}
                className="hover:scale-[0.98] transition-transform"
              >
                {restaurant?.info?.veg === true ? (
                  <RestaurantCardWithVegLabel list={restaurant} />
                ) : (
                  <RestaurantCard list={restaurant} />
                )}
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600 mt-10">
              <h2 className="text-2xl font-semibold ">No restaurants found 🍽️</h2>
              <p className="mt-2">Try a different search or clear filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;