import React from "react";
import { Input } from "antd";
import type { GetProps } from "antd";
import AllForgot from "@/components/AllForgot";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;
const Dashboard = () => {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);
  return (
    <>
      <div className="flex items-center justify-center">
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          className="w-5/6 flex items-center"
          onSearch={onSearch}
        />
      </div>
      <div className="flex justify-around pt-10">
        <div className="w-1/4 border">1</div>
        <div className="w-1/4 border">1</div>
        <div className="w-1/4 border">1</div>
      </div>
      <AllForgot />
    </>
  );
};

export default Dashboard;
