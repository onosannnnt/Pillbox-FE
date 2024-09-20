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
  count: number;
};

const AllForgot = () => {
  const [data, setData] = useState<dataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchAllForgot = async () => {
    try {
      const response = await axiosInstance.get("/admin/getAllForgetHistory");
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
        <div className="w-full h-screen content-center text-center">
          <Loading size="large" />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center h-4/6 pt-10 bg-white rounded-2xl">
        <div>จำนวนครั้งการลืมทานยา</div>
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
            <Bar dataKey="count" barSize={40} fill="#413ea0" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default AllForgot;
