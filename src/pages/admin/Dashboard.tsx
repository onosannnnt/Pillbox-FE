import React from "react";
import AllForgot from "@/components/AllForgot";

const Dashboard = () => {
  return (
    <>
      <div className="h-full w-full flex flex-col items-center gap-10 py-10">
        <h1 className="text-4xl">ภาพรวม</h1>
        <div className="w-full flex justify-around">
          <div className="w-1/4 border">1</div>
          <div className="w-1/4 border">1</div>
          <div className="w-1/4 border">1</div>
        </div>
        <AllForgot />
      </div>
    </>
  );
};

export default Dashboard;
