import HomeLayout from "@/components/layouts/HomeLayout";
import History from "@/pages/History";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Welcome from "@/pages/Welcome";
import { ConfigProvider } from "antd";
import { Suspense } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import {
  BASE_ROUTE,
  HISTORY_ROUTE,
  LOGIN_ROUTE,
  FORGOTTEN_RATE_ROUTE,
  PILL_STOCK_ROUTE,
  WELCOME_ROUTE,
  PILL_DETAIL_ROUTE,
} from "@/config/route";
import PillStock from "@/pages/PillStock";
import Forgotten from "./pages/Forgotten";
import PillDetail from "./pages/PillDetail";

function App() {
  return (
    <ConfigProvider>
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
          <Route path={WELCOME_ROUTE} element={<Welcome />} />
          <Route path={LOGIN_ROUTE} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
