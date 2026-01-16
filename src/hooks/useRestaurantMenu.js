import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "../store/menuSlice";

import { API } from "../utils/constant";
//import Mockdata from "../mocks/Mockdata.json";


const useRestaurantMenu = (resId) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchMenu(resId));
  }, [resId]);
  const { data: menuData, loading, error } = useSelector(
    (store) => store.menu
  );
  
  
  
  
  // const [resInfo, setResInfo] = useState(null);
  // const fetchMenu = async () => {    
  //  const data = await fetch (`${API}/api/menu/${resId}`); 
  //   const json = await data?.json();  
  //   const menuData = json?.data?.cards; 
  //  setResInfo(menuData);
  // };
  
  // useEffect(() => {
  //   fetchMenu();
  // }, []);
//   useEffect(() => {
//   dispatch(fetchMenu(resId));
// }, [resId]);


  return { menuData, loading, error };
}
export default useRestaurantMenu;
