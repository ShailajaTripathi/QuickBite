// import { useDispatch } from "react-redux";
// import { removeItem } from "../../store/cartSlice";
// import { clearCart } from "../../store/cartSlice";

// const CartItem = ({ item }) => {
//   const { name, price, defaultPrice, imageId } = item.card.info;
//   const dispatch = useDispatch();
//   return (
//     <div className="flex justify-between items-center border-b pb-4">
//       <div>
//         <h3 className="font-semibold">{name}</h3>
//         <p className="text-gray-600">₹{(price || defaultPrice) / 100}</p>
//       </div>

//       {imageId && (
//         <img
//           src={item?.card?.info?.imageId}
//           alt={item?.card?.info?.name}
//           className="w-20 h-20 object-cover rounded"
//         />
//       )}
      
//         <div>
//           <button
//             onClick={() => dispatch(removeItem(item?.card?.info?.id))}
//             className="bg-red-500 text-white px-2 py-1 rounded"
//           >
//             Remove
//           </button>
//         </div>
        

//     </div>
//   );
// };

// export default CartItem;


import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../../store/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { name, price, defaultPrice,imageId } = item.card.info;

  return (
    <div className="flex justify-between items-center border-b pb-4">
      <div>
        <h3 className="font-semibold">{name}</h3>
        <p className="text-gray-600">
          ₹{(price || defaultPrice) / 100}
        </p>
      </div>
         {imageId && (
      <img
           src={item?.card?.info?.imageId}
           alt={item?.card?.info?.name}
          className="w-20 h-20 object-cover rounded"
        />
       )}

      <div className="flex items-center gap-3">
        <button
          onClick={() => dispatch(removeItem(item.card.info.id))}
          className="px-3 py-1 bg-gray-300 rounded"
        >
          −
        </button>

        <span className="font-bold">{item.quantity}</span>

        <button
          onClick={() => dispatch(addItem(item))}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
