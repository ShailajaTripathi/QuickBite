import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext/UserContext";
import { useState,useContext } from "react";
import { LOGO_URL } from "../utils/constant";
import { Link } from "react-router";
//use { } to import named export

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
const onlineStatus =useOnlineStatus();
const {loggedInUser}= useContext(UserContext);

  return (
    <div className="header flex justify-between bg-gray-100 shadow-lg sm:bg-yellow-50 lg:bg-green-50">
      <div className="logo-container px-4">
        <img className="logo w-[50px]" src={LOGO_URL} />
        <p className="eat-by-click text-green-600">QuickBite</p>
      </div>
      <div className="nav-items flex items-center ">
        <ul className="flex p-4 m-4">
        <li className="px-4">Online Status :{onlineStatus?  '🟢' : '🔴'}</li>
          <li className="px-4 hover:bg-green-500 hover:text-white">
            <Link to="/" className="nav-link-item">
              Home
            </Link>
          </li>
          <li className="px-4 hover:bg-green-500 hover:text-white">
            <Link to="/about" className="nav-link-item">
              About us
            </Link>
          </li>
          <li className="px-4 hover:bg-green-500 hover:text-white ">
            <Link to="/contact" className="nav-link-item">
              Contact
            </Link>
          </li>

          <button
            className="login px-4 hover:bg-green-300 hover:text-red-600"
            onClick={() => {
              btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
            }}
          >
            {btnName}
          </button>
          <li className="px-4 font-bold"> 👤 {loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
// default export
