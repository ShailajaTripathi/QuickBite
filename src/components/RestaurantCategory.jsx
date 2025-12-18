import React, { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({showItems,setShowIndex,...data}) => {

const handleClick =()=>{
  setShowIndex();
  //showItems = !showItems;
}
  return (
    <div>
      {/* Header */}
      <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4">
        <div
          className="flex justify-between cursor-pointer"
           onClick={handleClick}
        >
          <span className="font-bold text-lg cursor-pointer">
            {data?.category?.title} ({data?.category?.itemCards.length})
          </span>
          <span className="cursor-pointer">{showItems ? "▼" : "▲"}</span>
        </div>
        { showItems && <ItemList data={data?.category?.itemCards} />}
      </div>
      {/* accordian item */}
    </div>
  );
};

export default RestaurantCategory;
