import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      console.log("Hooray! Net aa gaya.");
      setOnlineStatus(true);
    };

    const handleOffline = () => {
      console.log("Oops! Net chala gaya.");
      setOnlineStatus(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup to prevent memory leaks
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return onlineStatus;
};

export default useOnlineStatus;