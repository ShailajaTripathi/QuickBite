import { useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "../store/menuSlice";

const useRestaurantMenu = (resId) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchMenu(resId));
  }, [resId]);
  const { data: menuData, loading, error } = useSelector(
    (store) => store.menu
  );
  return { menuData, loading, error };
}
export default useRestaurantMenu;
