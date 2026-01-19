import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import Swal from "sweetalert2";

 const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  // Load user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signup = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const login = (email) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email === email) {
      setUser(storedUser);
      return true;
    }
    return false;
  };
const logout = () => {
  Swal.fire({
    title: "Logout?",
    text: "You will be logged out of your account",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Logout",
  }).then((result) => {
    if (result.isConfirmed) {
  setUser(null);   // context reset
      dispatch(clearCart());
    }
  });
};


  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
