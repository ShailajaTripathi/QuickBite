import { useEffect, useState } from "react";
import { MENU_API } from "./constant";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  const fetchMenu = async () => {
    const data = await fetch(
      MENU_API + resId + "&catalog_qa=undefined&submitAction=ENTER"
    );
    const json = await data?.json();

    const menuData = json?.data?.cards;
    setResInfo(menuData);
  };
  
  useEffect(() => {
    fetchMenu();
  }, []);

  return resInfo;
}
export default useRestaurantMenu;  
