import {
  BASE_ROUTE,
  HISTORY_ROUTE,
  FORGOTTEN_RATE_ROUTE,
  PILL_STOCK_ROUTE,
  ADMIN_ROUTE,
} from "@/config/route";
import { AuthContext } from "@/context/auth";
import { axiosInstance } from "@/utils/axios";
import { Button } from "antd";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import klongyaa from "@/assets/klongyaa.png";

const SideBar: React.FC = () => {
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
      <div className="bg-primary-blue text-black flex h-full w-80 flex-col justify-between py-[4rem]">
        <div className="flex flex-col justify-center">
          <img
            src={klongyaa}
            alt="icon"
            className="w-64 aspect-square self-center"
          />
          <div className="flex flex-col gap-y-4 text-xl">
            <p className="text-center text-2xl ">{auth?.auth.username}</p>
            <Link to={BASE_ROUTE}>
              <p className="text-center hover:bg-secondary-blue p-2">Home</p>
            </Link>
            <Link to={HISTORY_ROUTE}>
              <p className="text-center hover:bg-secondary-blue p-2">History</p>
            </Link>
            <Link to={FORGOTTEN_RATE_ROUTE}>
              <p className="text-center hover:bg-secondary-blue p-2">
                Forgetten Rate
              </p>
            </Link>
            <Link to={PILL_STOCK_ROUTE}>
              <p className="text-center hover:bg-secondary-blue p-2">
                Pill Stock
              </p>
            </Link>
            {auth?.auth.role === "admin" ? (
              <Link to={ADMIN_ROUTE}>
                <p className="text-center hover:bg-secondary-blue p-2">Admin</p>
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex w-full justify-center">
          <Button className="bg-secondary-blue" onClick={handleLogout}>
            ออกจากระบบ
          </Button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
