import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { Select, Space } from 'antd';

const Forgotten = () => {
    const data = [{name:'Sunday', forgotten: 5}, {name:'Monday', forgotten: 2}, {name:'Tuesday', forgotten: 8}, {name:'Wednesday', forgotten: 4}, {name:'Thursday', forgotten: 4}, {name:'Friday', forgotten: 2}, {name:'Saturday', forgotten: 3}];
  return (
    <>
      <div className="container p-8 flex flex-col gap-y-4">
        <h1 className="text-2xl font-bold text-center">อัตราการลืมทานยา</h1>
        <h2 className="text-1xl font-bold text-center">
          ตั้งแต่วันที่ --/--/-- ถึง --/--/--
        </h2>
        <div className="flex w-full justify-end">
            <Select
      defaultValue="lucy"
      style={{ width: "20%" }}
      options={[
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'Yiminghe', label: 'yiminghe' },
        { value: 'disabled', label: 'Disabled', disabled: true },
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
