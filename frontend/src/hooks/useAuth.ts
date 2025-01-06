import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AdminLogin, AdminLoginRequest } from "@/api/authApi";

export const useAuth = () => {
  const navigate = useNavigate();

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  useEffect(() => {
    const adminToken = localStorage.getItem("admin_jwt");

    setIsAdminAuthenticated(!!adminToken);
    setIsAuthLoading(false);
  }, []);

  const adminlogin = async (reqData: AdminLoginRequest) => {
    try {
      const res = await AdminLogin(reqData);
      localStorage.setItem("admin_jwt", res.data.token);
      setIsAdminAuthenticated(true);
    } catch (error) {
      console.error("Admin login failed:", error);
    }
  };

  const adminlogout = () => {
    localStorage.removeItem("admin_jwt");
    setIsAdminAuthenticated(false);
    navigate("/login/admin");
  };

  return {
    isAdminAuthenticated,
    isAuthLoading,
    adminlogin,
    adminlogout,
  };
};
