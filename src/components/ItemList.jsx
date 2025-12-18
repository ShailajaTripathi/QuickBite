import React from "react";
import { MENU_IMAGE_URL } from "../utils/constant";
const ItemList = ({ data }) => {
  console.log("dataaaa itemlist", data);
  return (
    <div>
      {data?.map((item, index) => (
        <div
          key={index}
          className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between bg-gray-100"
        >
          <div className="py-2 w-9/12">
            <span>{item?.card?.info?.name}</span>
            <span>
              {" "}
              - ₹
              {item?.card?.info?.price
                ? item?.card?.info?.price / 100
                : item?.card?.info?.defaultPrice / 100}
            </span>
            <p className="text-xs px-3">{item?.card?.info?.description}</p>
          </div>
          <div className="relative w-3/12">
            <img
              src={MENU_IMAGE_URL + item?.card?.info?.imageId}
              alt={item?.card?.info?.name}
              className="w-[150px] h-[100px] rounded-lg object-cover"
            />
            <div className="bg-white text-center rounded-lg px-4 py-2 m-3 shadow-lg absolute font-bold bottom-0 left-1.5 transform -translate-x-1/2 translate-y-1/2">
              <button className="text-green-700 font-semibold">ADD</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
