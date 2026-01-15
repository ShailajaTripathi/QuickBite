import ItemList from "./ItemList.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";


const RestaurantCategory = ({showItems,setShowIndex,...data}) => {
  

const handleClick =()=>{
  setShowIndex();
}
  return (
    <div className="mb-4">
      {/* Category Header */}
      <div 
        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer border-l-4 border-green-600 overflow-hidden"
        onClick={handleClick}
      >
        <div className="p-4 flex justify-between items-center hover:bg-green-50 transition-colors">
          <div>
            <h3 className="font-bold text-lg text-gray-800">
              {data?.category?.title}
            </h3>
            <p className="text-sm text-gray-500">({data?.category?.itemCards.length} items)</p>
          </div>
          <span className="text-2xl text-green-600 transition-transform duration-300 transform">
            {showItems ? <FontAwesomeIcon icon={faCaretDown} /> : <FontAwesomeIcon icon={faCaretRight} />}
          </span>
        </div>
        
        {/* Menu Items */}
        { showItems && (
          <div className="border-t border-gray-200 bg-gray-50">
            <ItemList data={data?.category?.itemCards} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantCategory;
