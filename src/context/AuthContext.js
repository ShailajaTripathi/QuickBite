import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";

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
  localStorage.removeItem("user");   // auth remove
  dispatch(clearCart());             // cart empty
  setUser(null);   // context reset
};


  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
