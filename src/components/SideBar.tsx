import {
  BASE_ROUTE,
  HISTORY_ROUTE,
  FORGOTTEN_RATE_ROUTE,
  PILL_STOCK_ROUTE,
} from "@/config/route";
import { axiosInstance } from "@/utils/axios";
import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const SideBar: React.FC = () => {
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
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ระบบขัดข้อง",
        text: "กรุณาลองใหม่อีกครั้ง",
      });
      console.log(error);
      return;
    }
  };

  return (
    <React.Fragment>
      <div className="bg-primary-blue text-black flex h-full w-80 flex-col justify-between py-[4rem]">
        <div className="flex flex-col justify-center">
          <img
            src="klongyaa.png"
            alt="icon"
            className="w-64 aspect-square self-center"
          />
          <div className="flex flex-col gap-y-4">
            <p className="text-center">Test@gmail.com</p>
            <Link to={BASE_ROUTE}>
              <p className="text-center">Home</p>
            </Link>
            <Link to={HISTORY_ROUTE}>
              <p className="text-center">History</p>
            </Link>
            <Link to={FORGOTTEN_RATE_ROUTE}>
              <p className="text-center">Forgetten Rate</p>
            </Link>
            <Link to={PILL_STOCK_ROUTE}>
              <p className="text-center">Pill Stock</p>
            </Link>
          </div>
        </div>
        <div className="flex w-full justify-center">
          <Button className="bg-secondary-blue" onClick={handleLogout}>
            ออกจากระบบ
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SideBar;
