import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const verify = async () => {
      
      try {
      const token = localStorage.getItem("adminToken");
      setIsValid(true)
      setLoading(false)
     
      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

        
      } catch (err) {
         console.error(err);
         
      } 
    };

    verify();
  }, []);

  if (loading) {
    return <div className="text-white p-10">Checking authentication...</div>;
  }

  return isValid ? children : null;
};

export default ProtectedRoute;
