import { axiosInstance } from "@/utils/axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

type dataType = {
  firstName: string;
  user_username: string;
  user: string;
  latestActive: Date;
};

const LatestActive = () => {
  const [data, setData] = useState<dataType[]>([]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/admin/getLatestActive");
      setData(response.data as dataType[]);
    } catch {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถดึงข้อมูลการใช้งานล่าสุดได้",
      });
    }
  };

  useEffect(() => {
    fetchData();
    console.log(`latest Active`, data);
  }, []);

  return (
    <>
      <div className="w-full h-full flex flex-col justify-around overflow-y-scroll bg-white rounded-lg px-5">
        <h1 className="text-center text-2xl">การใช้งานล่าสุด</h1>
        {data &&
          data.map((item, index) => {
            return (
              <div className="grid grid-cols-3" key={index}>
                <div>{item.firstName || item.user_username}</div>
                <div>
                  {new Date(item.latestActive).toLocaleString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div>
                  {new Date(item.latestActive).toLocaleTimeString("th-TH", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default LatestActive;
