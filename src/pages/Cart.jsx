import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/cart/CartItem";
import { clearCart } from "../store/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { selectCartTotal } from "../store/cartSelectors";
import Swal from "sweetalert2";

const Cart = () => {
    const totalPrice = useSelector(selectCartTotal);

  const dispatch = useDispatch();

  const cartItems = useSelector((store) => store.cart.items);
  



  // 🟡 EMPTY CART
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h2 className="text-2xl font-bold mb-2">
          Your cart is empty <FontAwesomeIcon icon={faCartShopping} />
        </h2>
        <p className="text-gray-500">
          Add items from the menu to see them here.
        </p>
      </div>
    );
  }

  // 🟢 CART WITH ITEMS
  return (
    <div className="max-w-4xl mx-auto p-4 ">
      <div className="flex justify-between items-center gap-3">
        <div>
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        </div>
        <div>
          <button
            onClick={handleClearCart}
            className="bg-gray-600 text-white px-4 py-1 rounded"
          >
            Clear Cart
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {cartItems?.map((item) => (
          <CartItem key={item.card.info.id} item={item} />
        ))}
      </div>
      <div className="text-right font-bold text-xl mt-6">
        Total Price : ₹ {totalPrice} /-
      </div>
    </div>
  );
};

export default Cart;
