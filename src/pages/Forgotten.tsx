import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Select } from "antd";

const Forgotten = () => {
  const data = [
    { name: "วันอาทิตย์", forgotten: 5 },
    { name: "วันจันทร์", forgotten: 2 },
    { name: "วันอังคาร", forgotten: 8 },
    { name: "วันพุธ", forgotten: 4 },
    { name: "วันพฤหัส", forgotten: 4 },
    { name: "วันศุกร์", forgotten: 2 },
    { name: "วันเสาร์", forgotten: 3 },
  ];
  return (
    <>
      <div className="container p-8 flex flex-col gap-y-4">
        <h1 className="text-2xl font-bold text-center">อัตราการลืมทานยา</h1>
        <h2 className="text-1xl font-bold text-center">
          ตั้งแต่วันที่ --/--/-- ถึง --/--/--
        </h2>
        <div className="flex w-full justify-end">
          <Select
            defaultValue="all"
            style={{ width: "20%" }}
            options={[
              { value: "all", label: "ทั้งหมด" },
              { value: "1", label: "1" },
              { value: "2", label: "2" },
              { value: "3", label: "3" },
              { value: "4", label: "4" },
              { value: "5", label: "5" },
              { value: "6", label: "6" },
              { value: "7", label: "7" },
              { value: "8", label: "8" },
            ]}
          />
        </div>
        <div className="flex justify-center ">
          <ResponsiveContainer width="100%" height={600}>
            <LineChart data={data}>
              <Line type="monotone" dataKey="forgotten" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Forgotten;
