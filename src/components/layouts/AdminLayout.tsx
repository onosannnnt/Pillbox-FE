import { LOGIN_ROUTE } from "@/config/route";
import { AuthContext, TRole } from "@/context/auth";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSideBar from "../AdminSideBar";
import AdminNavbar from "../AdminNavbar";

type Props = {
  children: React.ReactNode;
};

const AdminLayout: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  useEffect(() => {
    const AllowRole: TRole[] = ["admin"];
    if (authContext?.auth.isAuth === false) {
      navigate(LOGIN_ROUTE);
    }
    if (authContext?.auth.role && !AllowRole.includes(authContext.auth.role)) {
      navigate(LOGIN_ROUTE);
    }
  }, [authContext, navigate]);

  return (
    <>
      <div className="w-full hidden lg:flex">
        <div className="sticky left-0 top-0 h-screen bg-white">
          <AdminSideBar />
        </div>
        <div className="w-full m-[2rem] rounded-2xl bg-secondary-blue bg-opacity-25">
          {props.children}
        </div>
      </div>
      <div className="lg:hidden">
        <div className="left-0 top-0 bg-white">
          <AdminNavbar />
        </div>
        <div className="bg-secondary-blue bg-opacity-25 w-screen h-screen">
          {props.children}
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
