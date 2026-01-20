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
import { addItem, deleteItem, removeItem } from "../../store/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { name, price, defaultPrice, imageId,id} = item.card.info;
  console.log("Cart Item Rendered:",item.card);
const handleDecrease = () => {
  if (item.quantity === 1) {
    Swal.fire({
      title: "Remove item?",
      text: "This item will be removed from cart",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Remove",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteItem(id));
      }
    });
  } else {
    dispatch(removeItem(id));
  }
};const handleDelete = () => {
  if (item.quantity >= 1) {
    Swal.fire({
      title: "Delete item?",
      text: "This item will be deleted from cart",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteItem(id));
      }
    });
  } 
};


  return (
    <div className="flex justify-between items-center border-b pb-4">
      <div>
        <h3 className="font-semibold">{name}</h3>
        <p className="text-gray-600">₹{(price || defaultPrice) / 100}</p>
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
          onClick={handleDecrease}
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
        <button
          onClick={handleDelete}
          className="ml-4 text-red-600 hover:text-red-800 focus:outline-none"
          title="Remove Item"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
