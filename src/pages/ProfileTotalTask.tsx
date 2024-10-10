import { axiosInstance } from "@/utils/axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

type DataType = {
  task: string;
  total: number;
};

const transformData = (task: string) => {
  switch (task) {
    case "alert":
      return "แจ้งเตือนยา";
    case "take":
      return "ผู้ใข้ทานยา";
    case "forget":
      return "ผู้ใช้ลืมทานยา";
    default:
      return "ไม่พบข้อมูล";
  }
};

const ProfileTotalTask = () => {
  const { username } = useParams();
  const [data, setData] = useState<DataType[]>([]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        `/admin/getUserTotalLog/${username}`
      );
      setData(response.data);
    } catch {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถดึงข้อมูลจำนวนประวัติได้",
      });
    }
  };

  useEffect(() => {
    fetchData();
    console.log(data);
  }, []);

  return (
    <div className="bg-white w-full h-full rounded-lg shadow-md">
      <div className="flex flex-col items-center justify-center rounded-t-lg p-4 w-full">
        <h1 className="text-2xl font-semibold">จำนวนประวัติการใช้งาน</h1>
        <div className="flex w-full flex-col p-4 gap-y-5">
          {data &&
            data.map((item: DataType, index: number) => (
              <div
                className="w-full grid grid-cols-4 text-xl text-left"
                key={index}
              >
                <div className=" col-span-2">{transformData(item.task)}</div>
                <div> {item.total}</div>
                <div>ครั้ง</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileTotalTask;
