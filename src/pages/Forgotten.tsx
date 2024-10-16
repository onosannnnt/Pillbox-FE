import { FC, useEffect, useState } from "react";
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
import Swal from "sweetalert2";
import { axiosInstance } from "@/utils/axios";
import Loading from "@/components/Loading";

type forgottenType = {
  id: string;
  task: string;
  createdAt: Date;
  medicine: medicineType;
};

type medicineType = {
  id: string;
  name: string;
  description: string;
  note: string;
  img: string;
};

const Forgotten: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [forgotten, setForgotten] = useState<forgottenType[]>([]);
  const [medicine, setMedicine] = useState<medicineType[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const fetchMedicine = async () => {
    try {
      const response = await axiosInstance("/user/getMedicines");
      setMedicine([
        {
          id: "",
          name: "all",
          description: "",
          note: "",
          img: "",
        },
        ...response.data,
      ]);
    } catch {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถดึงข้อมูลยาได้",
      });
    }
  };

  const fetchForgotten = async () => {
    const data = [
      { name: "วันอาทิตย์", forgotten: 0 },
      { name: "วันจันทร์", forgotten: 0 },
      { name: "วันอังคาร", forgotten: 0 },
      { name: "วันพุธ", forgotten: 0 },
      { name: "วันพฤหัส", forgotten: 0 },
      { name: "วันศุกร์", forgotten: 0 },
      { name: "วันเสาร์", forgotten: 0 },
    ];
    try {
      const response = await axiosInstance("/user/getForgetHistory");
      response.data.forEach((item: forgottenType) => {
        const date = new Date(item.createdAt).getDay();
        if (filter !== "all" && item.medicine.name !== filter) return;
        data[date].forgotten += 1;
      });
      setForgotten(data as unknown as forgottenType[]);
    } catch {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถดึงข้อมูลการลืมยาได้",
      });
    }
  };

  useEffect(() => {
    fetchMedicine();
    fetchForgotten();
    setIsLoading(false);
  }, [filter]);

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
      <div className="container p-8 flex flex-col gap-y-4 h-full">
        <h1 className="text-2xl font-bold text-center">อัตราการลืมทานยา</h1>
        <h2 className="text-1xl font-bold text-center">
          ตั้งแต่วันที่{" "}
          {new Date(
            new Date().setDate(new Date().getDate() - 6)
          ).toLocaleDateString("th-TH", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}{" "}
          ถึง {new Date().toLocaleDateString()}
        </h2>
        <div className="flex w-full justify-end">
          <Select
            defaultValue="all"
            style={{ width: "20%" }}
            options={medicine.map((item) => ({
              label: item.name === "all" ? "ทั้งหมด" : item.name,
              value: item.name,
            }))}
            onChange={(value) => setFilter(value)}
          />
        </div>
        <div className="flex justify-center h-3/4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forgotten}>
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
