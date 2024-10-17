import AllForgot from "@/components/AllForgot";
import AllForgotPieChart from "@/components/AllForgotPieChart";
import LatestActive from "@/components/LatestActive";
import UserList from "@/components/UserList";

const Dashboard = () => {
  return (
    <>
      <div className="h-full w-full lg:flex flex-col items-center gap-10 py-10 grid grid-cols-1 place-items-center">
        <h1 className="text-4xl">ภาพรวม</h1>
        <div className="w-full lg:flex justify-around grid grid-cols-1 ">
          <div className="h-full w-full lg:w-2/5 flex gap-10">
            <AllForgotPieChart />
          </div>
          <div className="h-full w-full lg:w-2/5 flex gap-10">
            <LatestActive />
          </div>
        </div>
        <div className="h-96 w-full flex justify-center">
          <AllForgot />
        </div>
        <div className="w-11/12">
          <UserList />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
