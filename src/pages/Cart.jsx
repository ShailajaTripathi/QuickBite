import { useSelector } from "react-redux";
import CartItem from "../components/cart/CartItem";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
const totalPrice = cartItems.reduce((total, item) => {
  const price = item?.card?.info?.price ?? item?.card?.info?.defaultPrice ?? 0;
  return total + price;
}, 0) / 100;

  // 🟡 EMPTY CART
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h2 className="text-2xl font-bold mb-2">Your cart is empty 🛒</h2>
        <p className="text-gray-500">
          Add items from the menu to see them here.
        </p>
      </div>
    );
  }

  // 🟢 CART WITH ITEMS
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <CartItem key={item.card.info.id} item={item} />
        ))}
      </div>
      <div className="text-right font-bold text-xl mt-6">
        Total Price : ₹  {totalPrice} /-
      </div>
    </div>
  );
};

export default Cart;
