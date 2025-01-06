import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import MainPage from "./pages/MainPage";
import { ProtectedAdminLayout } from "./layout/ProtectedLayout";
import { useEffect, useState, Suspense } from "react";
import Loader from "./common/Loader";
import AdminLogin from "./pages/AdminLogin";
import StartNewAgenda from "./pages/AdminPage";

const App = () => {
  const { isAdminAuthenticated } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/login/admin"
          element={
            isAdminAuthenticated ? <Navigate to="/admin" /> : <AdminLogin />
          }
        />
        {/* <Route path="/login/admin" element={<AdminLoginPage />} /> */}
        <Route path="/" element={<MainPage />} />
        {/* Add all admin protected routes here */}
        <Route element={<ProtectedAdminLayout />}>
          <Route path="/admin" element={<StartNewAgenda />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default App;
