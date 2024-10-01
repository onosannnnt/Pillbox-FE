import React from "react";
import AllForgot from "@/components/AllForgot";
import AllForgotPieChart from "@/components/AllForgotPieChart";
import LatestActive from "@/components/LatestActive";

const Dashboard = () => {
  return (
    <>
      <div className="h-full w-full flex flex-col items-center gap-10 py-10">
        <h1 className="text-4xl">ภาพรวม</h1>
        <div className="w-full flex justify-around">
          <div className="h-full  w-2/5 flex gap-10">
            <AllForgotPieChart />
          </div>
          <div className="h-full w-2/5 flex gap-10">
            <LatestActive />
          </div>
        </div>
        <AllForgot />
      </div>
    </>
  );
};

export default Dashboard;
