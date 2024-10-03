import { axiosInstance } from "@/utils/axios";
import React, { useEffect, useState } from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Swal from "sweetalert2";
import Loading from "./Loading";

type dataType = {
  firstName: string;
  user_username: string;
  user: string;
  forget: number;
};

const AllForgot = () => {
  const [data, setData] = useState<dataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchAllForgot = async () => {
    try {
      const response = await axiosInstance.get("/admin/getWeeklyForgotAllUser");
      console.log(response.data);
      if (response.status === 200) {
        setData(response.data);
      }
      setIsLoading(false);
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
  if (isLoading) {
    return (
      <>
        <div className="w-full h-full content-center text-center">
          <Loading size="large" />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full w-11/12 bg-white rounded-2xl">
        <h1 className="pt-7 text-2xl">จำนวนครั้งการลืมทานยา</h1>
        <h2 className="text-1xl text-center">
          ตั้งแต่วันที่
          {new Date(
            new Date().setDate(new Date().getDate() - 6)
          ).toLocaleDateString("th-TH", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}{" "}
          ถึง {new Date().toLocaleDateString()}
        </h2>
        <ResponsiveContainer width="75%">
          <ComposedChart
            layout="vertical"
            width={500}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis type="number" />
            <YAxis dataKey="user_username" type="category" />
            <Tooltip />
            <Bar dataKey="จำนวนครั้งที่ลืม" barSize={30} fill="#279EFF" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default AllForgot;
