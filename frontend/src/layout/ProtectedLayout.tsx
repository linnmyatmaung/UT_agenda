import { useAuthContext } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedCodeLayout = () => {
  const { isAuthLoading } = useAuthContext();

  if (isAuthLoading) {
    console.log("Auth loading, showing loader...");
    return <div>Loading...</div>;
  }

  return <Outlet />; // Renders child routes
};

export const ProtectedAdminLayout = () => {
  const { isAdminAuthenticated, isAuthLoading } = useAuthContext();

  if (isAuthLoading) {
    console.log("Auth loading, showing loader...");
    return <div>Loading...</div>;
  }

  if (!isAdminAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login/admin" replace />;
  }

  return <Outlet />; // Renders child routes
};
