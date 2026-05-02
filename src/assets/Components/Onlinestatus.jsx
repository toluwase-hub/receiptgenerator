import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Online = () => {
  const [Isonline, setIsonline] = useState(navigator.onLine);

  useEffect(() => {
    const HandleOnline = () => {
      setIsonline(true);
    };

    const HandleOffline = () => {
      setIsonline(false);
    };

    window.addEventListener("online", HandleOnline);
    window.addEventListener("offline", HandleOffline);

    return () => {
      window.removeEventListener("online", HandleOnline);
      window.removeEventListener("offline", HandleOffline);
    };
  }, [Isonline]);
  useEffect( ()=> {
    if (!Isonline) {
    toast.error("No internet connection");
  } else {
    toast.success("Back Online");
  }
  }, [Isonline])
  

  return (
    <div>
      {Isonline ? (
        <div className="flex items-center gap-1">
          <span>Online</span>
          <div className="bg-green-600 h-3 w-3 rounded-full"></div>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <span>Offline</span>
          <div className="bg-red-600 h-3 w-3 rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default Online;
