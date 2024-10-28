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
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import klongyaa from "@/assets/klongyaa.png";
import { UpOutlined, DownOutlined } from "@ant-design/icons";

const Navbar: React.FC = () => {
  const auth = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
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
      <div className="w-full flex flex-col justify-center bg-primary-blue">
        <div className="flex">
          <img
            src={klongyaa}
            alt="icon"
            className="w-24 aspect-square self-center"
          />
          <h1 className="text-left pt-10 p-5 text-4xl">กล่องยา</h1>
        </div>
        <h2 className=" text-center pb-5 text-xl">{auth?.auth.username}</h2>
        {visible && (
          <>
            <Menu
              mode="inline"
              className="bg-primary-blue text-black flex flex-col w-full text-center"
            >
              <Menu.Item key="home">
                <Link to={BASE_ROUTE}>หน้าหลัก</Link>
              </Menu.Item>
              <Menu.Item key="history">
                <Link to={HISTORY_ROUTE}>ประวัติ</Link>
              </Menu.Item>
              <Menu.Item key="forgotten-rate">
                <Link to={FORGOTTEN_RATE_ROUTE}>อัตราการลืมทานยา</Link>
              </Menu.Item>
              <Menu.Item key="pill-stock">
                <Link to={PILL_STOCK_ROUTE}>คลังยาที่มี</Link>
              </Menu.Item>
              {auth?.auth.role === "admin" && (
                <Menu.Item key="admin">
                  <Link to={ADMIN_ROUTE}>Admin</Link>
                </Menu.Item>
              )}
              <Menu.Item key="logout" style={{ float: "right" }}>
                <Button
                  type="primary"
                  className="w-full"
                  onClick={handleLogout}
                >
                  ออกจากระบบ
                </Button>
              </Menu.Item>
            </Menu>
          </>
        )}
        <Button type="primary" onClick={() => setVisible(!visible)}>
          {visible ? <UpOutlined /> : <DownOutlined />}
        </Button>
      </div>
    </>
  );
};

export default Navbar;
