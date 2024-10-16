import { axiosInstance } from "@/utils/axios";
import { Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

type TablePillStock = {
  channelIndex: number;
  medicine: MedicineType;
  total: number;
  amount: number;
  unit: string;
};

type MedicineType = {
  description: string;
  name: string;
  id: string;
  img: string;
  note: string;
};

const pillStockColumns: TableColumnsType<TablePillStock> = [
  {
    title: "ช่องที่",
    dataIndex: "channelIndex",
    key: "channelIndex",
    render: (channelIndex) => <span>{channelIndex + 1}</span>,
  },
  {
    title: "ชื่อยาสามัญ",
    dataIndex: "medicine",
    key: "medicine",
    render: (medicine) => <span>{medicine.name}</span>,
  },
  {
    title: "จำนวนยาทั้งหมด",
    dataIndex: "total",
    key: "total",
    render: (_, record) => <span>{record.total} เม็ด</span>,
  },
  {
    title: "จำนวนยาคงเหลือ",
    dataIndex: "amount",
    key: "amount",
    render: (_, record) => <span>{record.amount} เม็ด</span>,
  },
];

const PillStock: React.FC = () => {
  const { username } = useParams();
  const [data, setData] = useState<TablePillStock[]>([]);
  const fetchPill = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/admin/getUserPillChannel/${username}`
      );
      setData(data);
    } catch {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาลองใหม่อีกครั้ง",
      });
    }
  };

  useEffect(() => {
    fetchPill();
  }, []);

  return (
    <>
      <div className="container p-8 flex flex-col gap-y-4">
        <h1 className="text-2xl font-bold text-center">
          ประวัติการใช้งานกล่องยา
        </h1>
        <Table columns={pillStockColumns} dataSource={data} />
      </div>
    </>
  );
};

export default PillStock;
