import {
  BASE_ROUTE,
  HISTORY_ROUTE,
  FORGOTTEN_RATE_ROUTE,
  PILL_STOCK_ROUTE,
  ADMIN_ROUTE,
} from "@/config/route";
import { AuthContext } from "@/context/auth";
import { axiosInstance } from "@/utils/axios";
import { Button, Menu } from "antd";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar: React.FC = () => {
  const auth = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get("/user/logout");
      if (response.status != 200) {
        throw new Error("Logout failed");
      }
      Swal.fire({
        icon: "success",
        title: "ออกจากระบบสำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.href = BASE_ROUTE;
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "ระบบขัดข้อง",
        text: "กรุณาลองใหม่อีกครั้ง",
      });
      return;
    }
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center">
        <Menu
          mode="inline"
          className="bg-primary-blue text-black flex flex-col w-full text-center"
        >
          <h1 className="text-left pt-10 p-5 text-4xl">กล่องยา</h1>
          <h2 className=" text-left pl-5 pb-5 text-xl">
            {auth?.auth.username}
          </h2>
          <Menu.Item key="home">
            <Link to={BASE_ROUTE}>Home</Link>
          </Menu.Item>
          <Menu.Item key="history">
            <Link to={HISTORY_ROUTE}>History</Link>
          </Menu.Item>
          <Menu.Item key="forgotten-rate">
            <Link to={FORGOTTEN_RATE_ROUTE}>Forgotten Rate</Link>
          </Menu.Item>
          <Menu.Item key="pill-stock">
            <Link to={PILL_STOCK_ROUTE}>Pill Stock</Link>
          </Menu.Item>
          {auth?.auth.role === "admin" && (
            <Menu.Item key="admin">
              <Link to={ADMIN_ROUTE}>Admin</Link>
            </Menu.Item>
          )}
          <Menu.Item key="logout" style={{ float: "right" }}>
            <Button type="primary" className="w-full" onClick={handleLogout}>
              Logout
            </Button>
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
};

export default Navbar;
