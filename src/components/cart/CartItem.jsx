import { useDispatch } from "react-redux";
import { removeItem } from "../../store/cartSlice";
import { clearCart } from "../../store/cartSlice";

const CartItem = ({ item }) => {
  const { name, price, defaultPrice, imageId } = item.card.info;
  const dispatch = useDispatch();
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
      <div className="flex justify-between items-center gap-3">
        <div>
          <button
            onClick={() => dispatch(removeItem(item?.card?.info?.id))}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Remove
          </button>
        </div>
        <div>
          <button
            onClick={() => dispatch(clearCart())}
            className="bg-gray-600 text-white px-4 py-1 rounded"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
