import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling, faLeaf } from "@fortawesome/free-solid-svg-icons";

const RestaurantCard = (props) => {
  // Handle both full URL and cloudinary ID
  const {
    name,
    cloudinaryImageId,
    cuisines,
    avgRating,
    costForTwo,
    sla,
    isOpen,
  } = props?.list?.info;
  if (!props?.list?.info) return null;
  return (
    <div className="res-card relative w-72 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gray-300">
        <img
          className="res-logo w-full h-full object-cover"
          alt="res-logo"
          src={cloudinaryImageId}
        />
      </div>

      {/* Content Container */}
      <div className="p-4">
        {/* Restaurant Name */}
        <h3 className="font-bold text-xl text-gray-800 mb-2 truncate">
          {name}
        </h3>

        {/* Cuisines */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {cuisines.join(", ")}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
            ★ {avgRating}
          </span>
          {/* <span className="text-xs text-gray-500">
            ({props?.list?.info?.totalRatingsString || "ratings"})
          </span> */}
        </div>

        {/* Cost and Delivery Time */}
        <div className="flex justify-between items-center mb-3 text-sm">
          <span className="text-gray-700 font-medium">{costForTwo}</span>
          <span className="text-gray-600">{sla?.slaString}</span>
        </div>

        {/* Open/Closed Status */}
        {/* <div
          className={`text-center font-semibold text-sm py-2 px-3 rounded-lg ${
            props?.list?.info?.isOpen
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {isOpen ? "✓ Open" : "✗ Closed"}
        </div> */}
      </div>
    </div>
  );
};

// hoc
// input-- RestaurantCard
// output -- ReatauranCard with Pure veg label

export const withVegLabel = (RestaurantCard) => {
  // HoC function that takes RestaurantCard Compnent as argument

  return (props) => {
    return (
      <div className="relative">
        <label className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-sm font-semibold z-10 shadow-md">
          {/* Option A: Just a green leaf */}
          <FontAwesomeIcon icon={faLeaf} className="text-green-600" />
          <span className="text-green-600 font-bold text-sm">PURE VEG</span>
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
