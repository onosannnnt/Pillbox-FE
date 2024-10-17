import Loading from "@/components/Loading";
import { axiosInstance } from "@/utils/axios";
import { Select, Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

type HistoryType = {
  id: string;
  task: string;
  createdAt: Date;
  medicine: MedicineType;
};

type TableHistory = {
  date: Date;
  time: string;
  task: string;
  medicine: MedicineType;
};

type MedicineType = {
  description: string;
  name: string;
  id: string;
  img: string;
  note: string;
};

const historyColumns: TableColumnsType<TableHistory> = [
  {
    title: "วัน / เดือน / ปี",
    dataIndex: "createdAt",
    key: "date",
    render: (date: Date) => {
      return new Date(date).toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },

  {
    title: "เวลา",
    dataIndex: "createdAt",
    key: "time",
    render: (date: Date) => {
      return new Date(date).toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },

  {
    title: "รายการการเเจ้งเตือน",
    dataIndex: "task",
    key: "task",
    render: (task: string) => {
      if (task === "take") {
        return <p className="text-green-500">ผู้ใช้รับประทานยา</p>;
      } else if (task === "alert") {
        return <p>เเจ้งเตือนการทานยา</p>;
      } else if (task === "forget") {
        return <p className="text-red-600">ผู้ใช้ลืมรับประทานยา</p>;
      } else return "Test";
    },
    filters: [
      // Changed 'filter' to 'filters'
      {
        text: "เเจ้งเตือนการทานยา",
        value: "alert",
      },
      {
        text: "ผู้ใช้รับประทานยา",
        value: "take",
      },
      {
        text: "ผู้ใช้ลืมรับประทานยา",
        value: "forget",
      },
    ],
    filterMode: "tree",
    onFilter: (value, record) => record.task.startsWith(value as string),
  },

  {
    title: "ชื่อยา",
    dataIndex: "medicine",
    key: "medicine",
    render: (medicine: { name: string }) => {
      return medicine.name;
    },
  },
];

const History: React.FC = () => {
  const [isloading, setLoading] = useState<boolean>(true);
  const { username } = useParams();
  const [history, setHistory] = useState<TableHistory[]>([]);
  const [period, setPeriod] = useState<string>("week");
  const getHistory = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/admin/getUserHistory/${username}`
      );
      if (response.status != 200) {
        throw new Error("ไม่สามารถดึงประวัติได้");
      }
      setHistory(
        response.data.filter((item: HistoryType) => {
          const date = new Date(item.createdAt);
          if (period === "week") {
            return (
              date >= new Date(new Date().setDate(new Date().getDate() - 6))
            );
          } else if (period === "month") {
            return date.getMonth() === new Date().getMonth();
          } else if (period === "last_month") {
            return date.getMonth() === new Date().getMonth() - 1;
          }
        })
      );
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: (error as Error).message,
      });
    }
  };

  useEffect(() => {
    getHistory();
    setLoading(false);
  }, [period]);

  if (isloading) {
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
      <div className="container p-8 flex flex-col gap-y-4 text-lg">
        <h1 className="text-2xl font-bold text-center">
          ประวัติการใช้งานกล่องยา
        </h1>
        <div className="flex w-full justify-end">
          <Select
            className="lg:w-64 w-full"
            size="large"
            placeholder="เลือกเดือน"
            defaultValue={"week"}
            options={[
              {
                label: "สัปดาห์นี้",
                value: "week",
              },
              {
                label: "เดือนนี้",
                value: "month",
              },
              {
                label: "เดือนที่แล้ว",
                value: "last_month",
              },
            ]}
            onChange={(value) => setPeriod(value)}
          />
        </div>
        <div className="bg-white rounded-xl grid lg:grid-cols-2 grid-cols-1 py-4 px-2">
          <div className="grid grid-rows-2">
            <p className="text-center font-semibold lg:text-2xl text-lg">
              สรุปการรับประทานยา/การลืมรับประทานยา
            </p>
            <div className="grid grid-cols-2">
              <p className="content-center text-center">
                แจ้งเตือนการทานยาทั้งหมด
              </p>
              <div className="flex justify-center p-2 lg:p-0">
                <p className="bg-secondary-blue py-2 px-4 border-black rounded-xl drop-shadow-md">
                  {history.filter((item) => item.task === "alert").length} ครั้ง
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="grid grid-cols-2">
              <p className="content-center text-center">รับประทานยา</p>
              <div className="flex justify-center">
                <p className="bg-secondary-blue py-2 px-4 border-black rounded-xl text-green-500 drop-shadow-md">
                  {history.filter((item) => item.task === "take").length} ครั้ง
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <p className="content-center text-center">ลืมรับประทานยา</p>
              <div className="flex justify-center">
                <p className="bg-secondary-blue py-2 px-4 border-black rounded-xl text-red-600 drop-shadow-md">
                  {history.filter((item) => item.task === "forget").length}{" "}
                  ครั้ง
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Table columns={historyColumns} dataSource={history} />
        </div>
      </div>
    </>
  );
};

export default History;
