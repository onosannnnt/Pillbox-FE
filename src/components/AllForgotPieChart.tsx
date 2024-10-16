import { axiosInstance } from "@/utils/axios";
import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Swal from "sweetalert2";

// Sample data
type dataType = {
  firstName: string;
  user_username: string;
  user: string;
  forget: number;
};

const tableColumn = [
  {
    title: "ชื่อ",
    dataIndex: "firstName",
    key: "firstName",
    render: (text: string, record: dataType) => {
      return text || record.user_username;
    },
  },
  {
    title: "จำนวน",
    dataIndex: "forget",
    key: "forget",
  },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const getPercentage = (value: number, total: number) =>
  ((value / total) * 100).toFixed(2);

const AllForgotPieChart = () => {
  const [forgetData, setForgetData] = useState<dataType[]>([]);
  const [allTotal, setAllTotal] = useState<number>(0);

  const fetchAllForgot = async () => {
    try {
      const response = await axiosInstance.get("/admin/getAllForgetHistory");
      console.log(response.data);
      setAllTotal(
        response.data.reduce(
          (sum: number, entry: dataType) =>
            sum + parseInt(entry.forget.toString()),
          0
        )
      );
      setForgetData(response.data);
      console.log(allTotal);
    } catch {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  useEffect(() => {
    fetchAllForgot();
  }, []);
  return (
    <>
      <div className="w-full bg-white rounded-lg p-5">
        <div className="text-center text-2xl">จำนวนการลืมทานยาทั้งหมด</div>
        <div className="w-full grid grid-cols-2">
          <ResponsiveContainer width="100%" height={300}>
            {/* Responsive container */}
            <PieChart>
              <Pie
                data={forgetData}
                cx="50%" // Center the pie chart horizontally
                cy="50%" // Center the pie chart vertically
                innerRadius="60%" // Responsive inner radius
                outerRadius="80%" // Responsive outer radius
                fill="#8884d8"
                paddingAngle={5}
                dataKey="forget"
                // label={({ value }) => `${getPercentage(value, allTotal)}%`} // Display percentage in the label
              >
                {forgetData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => [
                  `${getPercentage(Number(value), allTotal)}%`,
                  `${props.payload.firstName || props.payload.user_username}`,
                ]}
              />{" "}
            </PieChart>
          </ResponsiveContainer>
          {/* <div className="flex flex-col justify-around divide-y-2 divide-gray-950 overflow-y-scroll">
            {forgetData.map((item, index) => (
              <div key={index} className="flex justify-between ">
                <div>{item.firstName || item.user_username || item.user}</div>
                <div>{item.forget} ครั้ง</div>
              </div>
            ))}
          </div> */}
          <Table
            columns={tableColumn}
            dataSource={forgetData}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>
    </>
  );
};

export default AllForgotPieChart;
