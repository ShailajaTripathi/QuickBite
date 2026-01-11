import useOnlineStatus from "../../hooks/useOnlineStatus.js";
import { useSelector } from "react-redux";
import { LOGO_URL } from "../../utils/constant.js";
import { useAuth } from "../../context/AuthContext.js";
import { Link } from "react-router-dom";

const Header = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const onlineStatus = useOnlineStatus();
  // const { loggedInUser } = useContext(UserContext);
  const loggedInUser = JSON.parse(localStorage.getItem("user"))?.name;
  const { user, logout } = useAuth();
  return (
    <div className="header sticky top-0 z-50 bg-white shadow-lg border-b-4 border-green-600">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-3 no-underline">
          <img
            className="logo w-12 h-12 rounded-full shadow-md"
            src={LOGO_URL}
            alt="QuickBite Logo"
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">
              QuickBite
            </h1>
            <p className="text-xs text-gray-500">Food Delivery</p>
          </div>
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center gap-8">
          <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0">
            {/* Online Status */}
            <li className="flex items-center gap-2 font-semibold text-gray-700">
              <span>Status:</span>
              <span className="text-xl">
                {onlineStatus ? "🟢 Online" : "🔴 Offline"}
              </span>
            </li>

            {/* Home Link */}
            <li className="group">
              <Link
                to="/"
                className="nav-link-item px-3 py-2 text-gray-700 font-semibold hover:text-green-600 transition-colors no-underline border-b-2 border-transparent group-hover:border-green-600"
              >
                🏠 Home
              </Link>
            </li>

            {/* About Link */}
            <li className="group">
              <Link
                to="/about"
                className="nav-link-item px-3 py-2 text-gray-700 font-semibold hover:text-green-600 transition-colors no-underline border-b-2 border-transparent group-hover:border-green-600"
              >
                ℹ️ About
              </Link>
            </li>

            {/* Contact Link */}
            <li className="group">
              <Link
                to="/contact"
                className="nav-link-item px-3 py-2 text-gray-700 font-semibold hover:text-green-600 transition-colors no-underline border-b-2 border-transparent group-hover:border-green-600"
              >
                📞 Contact
              </Link>
            </li>
            <li className="group">
              <Link
                to="/cart"
                className="nav-link-item px-3 py-2 text-gray-700 font-semibold hover:text-green-600 transition-colors no-underline border-b-2 border-transparent group-hover:border-green-600"
              >
                🛒 Cart : {cartItems?.length} Items
              </Link>
            </li>
          </ul>

          {/* Right Side Items */}
          <div className="flex items-center gap-4">
            {/* User Profile */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <span className="text-lg">👤</span>
              <span className="font-semibold text-gray-800 text-sm">
                {loggedInUser || "Guest"}
              </span>
            </div>

            {/* Login/Logout Button */}
            {/* <Link
                to="/auth"
            >

            <button
              className={`px-6 py-2 font-bold rounded-lg transition-all shadow-md hover:shadow-lg ${
                isLoggedIn
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
              onClick={isLoggedIn ? logout : login}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
            </Link> */}

            {user ? (
              <button onClick={logout} className="px-4 py-1 border rounded">
                Logout
              </button>
            ) : (
              <Link to="/auth" className="px-4 py-1 border rounded">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
// default export
