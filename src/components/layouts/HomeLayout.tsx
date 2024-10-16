import SideBar from "@/components/SideBar";
import { LOGIN_ROUTE } from "@/config/route";
import { AuthContext, TRole } from "@/context/auth";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const HomeLayout: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  useEffect(() => {
    const AllowRole: TRole[] = ["admin", "user"];
    if (authContext?.auth.isAuth === false) {
      navigate(LOGIN_ROUTE);
    }
    if (authContext?.auth.role && !AllowRole.includes(authContext.auth.role)) {
      navigate(LOGIN_ROUTE);
    }
    if (authContext?.auth.role === "admin") {
      navigate("/admin");
    }
  }, [authContext, navigate]);

  return (
    <>
      <div className="flex w-full">
        <div className="sticky left-0 top-0 h-screen bg-white">
          <SideBar />
        </div>
        <div className="w-full m-[2rem] rounded-2xl bg-secondary-blue bg-opacity-25">
          {props.children}
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
