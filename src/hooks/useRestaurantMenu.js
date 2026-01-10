import { useEffect, useState } from "react";
import { MENU_API } from "../utils/constant";
//import Mockdata from "../mocks/Mockdata.json";


const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  const fetchMenu = async () => {
    
   // const data = await fetch(`${MENU_API} ${resId} &catalog_qa=undefined&submitAction=ENTER`);
   const data = await fetch (`http://localhost:3000/api/menu/${resId}`); 
    const json = await data?.json();  
    const menuData = json?.data?.cards; 
   setResInfo(menuData);
  //setResInfo(Mockdata.data.cards);

  };
  
  useEffect(() => {
    fetchMenu();
  }, []);

  return resInfo;
}
export default useRestaurantMenu;
