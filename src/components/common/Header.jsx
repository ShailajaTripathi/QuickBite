import useOnlineStatus from "../../hooks/useOnlineStatus.js";
import { useSelector } from "react-redux";
import { LOGO_URL } from "../../utils/constant.js";
import { useAuth } from "../../context/AuthContext.js";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faInfoCircle,
  faHeadset,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { selectCartCount } from "../../store/cartSelectors.js";

const Header = () => {
  const cartCount = useSelector(selectCartCount);
  const onlineStatus = useOnlineStatus();
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
            {/* Home Link */}
            <li className="group">
              <Link
                to="/"
                className="nav-link-item px-3 py-2 text-gray-700 font-semibold hover:text-green-600 transition-colors no-underline border-b-2 border-transparent group-hover:border-green-600"
              >
                <FontAwesomeIcon icon={faHouse} /> Home
              </Link>
            </li>

            {/* About Link */}
            <li className="group">
              <Link
                to="/about"
                className="nav-link-item px-3 py-2 text-gray-700 font-semibold hover:text-green-600 transition-colors no-underline border-b-2 border-transparent group-hover:border-green-600"
              >
                <FontAwesomeIcon icon={faInfoCircle} /> About
              </Link>
            </li>

            {/* Contact Link */}
            <li className="group">
              <Link
                to="/contact"
                className="nav-link-item px-3 py-2 text-gray-700 font-semibold hover:text-green-600 transition-colors no-underline border-b-2 border-transparent group-hover:border-green-600"
              >
                <FontAwesomeIcon icon={faHeadset} /> Contact
              </Link>
            </li>

            {loggedInUser && (
              <li className="group">
                <Link
                  to="/cart"
                  className="nav-link-item px-3 py-2 text-gray-700 font-semibold hover:text-green-600 transition-colors no-underline border-b-2 border-transparent group-hover:border-green-600"
                >
                  <span className="relative">
                    <FontAwesomeIcon icon={faCartShopping} />

                    {!!cartCount && (
                      <span className="absolute top-0 right-0 bg-green-500 p-1 leading-[4px] rounded-full text-[8px] text-white">
                        {cartCount}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            )}
          </ul>

          {/* Right Side Items */}
          <div className="flex items-center gap-4">
            {/* User Profile */}
            {user && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <FontAwesomeIcon icon={faUser} />
                <span className="font-semibold text-gray-800 text-sm">
                  {loggedInUser}
                </span>
              </div>
            )}
            {user ? (
              <button onClick={logout} className="px-4 py-1 border rounded">
                Logout
              </button>
            ) : (
              <Link to="/login" className="px-4 py-1 border rounded ">
                Login
              </Link>
            )}
            {/* Online Status */}

            <div className="flex items-center gap-2">
              <i
                className={`fa-solid fa-circle text-[0.5rem] ${onlineStatus ? "text-green-500" : "text-gray-400"}`}
              ></i>
              <span
                className={onlineStatus ? "text-green-500" : "text-gray-400"}
              >
                {onlineStatus ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
// default export
