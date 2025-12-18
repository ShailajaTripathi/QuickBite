const RestaurantCard = (props) => {
  return (
    <div className="res-card m-4 p-4 w-[250px] bg-gray-200 rounded-lg hover:bg-gray-300">
      <img
        className="res-logo rounded-lg w-[200px]"
        alt="res-logo"
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${props?.resData?.info?.cloudinaryImageId}`}
      />
      <h3 className="font-bold py-4 text-lg">{props?.resData?.info?.name}</h3>
      <h4 className=""> {props?.resData?.info?.cuisines.join(",")}</h4>
      <h4> {props?.resData?.info?.avgRating} Stars</h4>
      <h4>{props?.resData?.info?.costForTwo}</h4>
      <h4> {props?.resData?.info?.sla?.slaString}</h4>
    </div>
  );
};

// hoc
// input-- RestaurantCard
// output -- ReatauranCard with Pure veg label

export const withVegLabel = (RestaurantCard) => {

  return (props) => {
    return <div>
      <label className="absolute bg-green-700 text-white m-2 p-1 rounded-lg">
       🔖 Pure Veg 
      </label>
      <RestaurantCard {...props} />    </div>;
  };
};

export default RestaurantCard;
