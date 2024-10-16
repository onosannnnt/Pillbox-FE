import { axiosInstance } from "@/utils/axios";
import { Table } from "antd";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

type dataType = {
  firstName: string;
  user_username: string;
  user: string;
  latestActive: Date;
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
    title: "วันที่",
    dataIndex: "latestActive",
    key: "latestActive",
    render: (text: Date) => {
      return new Date(text).toLocaleString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  {
    title: "เวลา",
    dataIndex: "latestActive",
    key: "latestActive",
    render: (text: Date) => {
      return new Date(text).toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
];

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
      <div className="w-full h-full bg-white rounded-lg p-5">
        <div className="w-full h-full flex flex-col">
          <div className="text-center text-2xl">การใช้งานล่าสุด</div>
          {/* <div className="flex flex-col justify-around h-full overflow-y-scroll">
            <div>
              <div className="grid grid-cols-3 font-bold">
                <div className="text-center">ชื่อ</div>
                <div className="text-center">วันที่</div>
                <div className="text-center">เวลา</div>
              </div>
            </div>
            {data &&
              data.map((item, index) => {
                return (
                  <div className="grid grid-cols-3" key={index}>
                    <div className="text-center">
                      {item.firstName || item.user_username}
                    </div>
                    <div className="text-center">
                      {new Date(item.latestActive).toLocaleString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="text-center">
                      {new Date(item.latestActive).toLocaleTimeString("th-TH", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                );
              })}
          </div> */}
          <Table
            columns={tableColumn}
            dataSource={data}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>
    </>
  );
};

export default LatestActive;
