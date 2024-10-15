import HomeLayout from "@/components/layouts/HomeLayout";
import History from "@/pages/History";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Welcome from "@/pages/Welcome";
import { ConfigProvider } from "antd";
import { AuthContext, InitAuthValue, IContextType } from "./context/auth";
import { Suspense, useState, useCallback, useEffect } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import {
  BASE_ROUTE,
  HISTORY_ROUTE,
  LOGIN_ROUTE,
  FORGOTTEN_RATE_ROUTE,
  PILL_STOCK_ROUTE,
  WELCOME_ROUTE,
  PILL_DETAIL_ROUTE,
  ADMIN_ROUTE,
  ADMIN_USER_PROFILE_ROUTE,
  ADMIN_PILL_STOCK_ROUTE,
  ADMIN_PILL_DETAIL_ROUTE,
} from "@/config/route";
import PillStock from "@/pages/PillStock";
import Forgotten from "./pages/Forgotten";
import PillDetail from "./pages/PillDetail";
import { axiosInstance } from "./utils/axios";
import Loading from "./components/Loading";
import AdminLayout from "@/components/layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Profile from "./pages/admin/Profile";
import AllPill from "./pages/admin/AllPill";
import AdminPillDetail from "./pages/admin/AdminPillDetail";

function App() {
  const [auth, setAuth] = useState<IContextType>(InitAuthValue);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleLogin = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/user/me");
      if (response.status === 200) {
        setAuth({
          email: response.data.email,
          username: response.data.username,
          numberOfPillChannels: response.data.numberOfPillChannels,
          role: response.data.role,
          isAuth: true,
        });
      }
    } catch {
      setAuth(InitAuthValue);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleLogin().then(() => console.log("success"));
  }, [handleLogin]);

  if (isLoading) {
    return (
      <>
        <div className="w-full h-screen content-center text-center">
          <Loading size="large" />
        </div>
      </>
    );
  }

  return (
    <ConfigProvider>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <BrowserRouter>
          <Routes>
            <Route
              path={BASE_ROUTE}
              element={
                <Suspense>
                  <HomeLayout>
                    <Outlet />
                  </HomeLayout>
                </Suspense>
              }
            >
              <Route index element={<Home />} />
              <Route path={HISTORY_ROUTE} element={<History />} />
              <Route path={PILL_STOCK_ROUTE} element={<PillStock />} />
              <Route path={FORGOTTEN_RATE_ROUTE} element={<Forgotten />} />
              <Route path={PILL_DETAIL_ROUTE} element={<PillDetail />} />
            </Route>
            <Route
              path={ADMIN_ROUTE}
              element={
                <Suspense>
                  <AdminLayout>
                    <Outlet />
                  </AdminLayout>
                </Suspense>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path={ADMIN_USER_PROFILE_ROUTE} element={<Profile />} />
              <Route path={ADMIN_PILL_STOCK_ROUTE} element={<AllPill />} />
              <Route
                path={ADMIN_PILL_DETAIL_ROUTE}
                element={<AdminPillDetail />}
              />
            </Route>
            <Route path={WELCOME_ROUTE} element={<Welcome />} />
            <Route path={LOGIN_ROUTE} element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </ConfigProvider>
  );
}

export default App;
