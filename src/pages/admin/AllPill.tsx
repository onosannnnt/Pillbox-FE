import React, { useEffect, useState } from "react";
import { Card } from "antd";
import Swal from "sweetalert2";
import { axiosInstance } from "@/utils/axios";

const { Meta } = Card;

type Medicine = {
  id: string;
  name: string;
  description: string;
  note: string;
  img: string;
};

const AllPill = () => {
  const [medicine, setMedicine] = useState<Medicine[]>([]);
  const fetchMedicines = async () => {
    try {
      const response = await axiosInstance.get("/admin/getMedicines");
      setMedicine(response.data);
    } catch {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถดึงข้อมูลยาทั้งหมดได้",
      });
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);
  return (
    <div className="w-full flex flex-col">
      <h1 className="text-3xl text-center">รายชื่อยาทั้งหมด</h1>
      <div className="flex ">
        {medicine.map((item) => (
          <Card
            hoverable
            className="m-5 w-1/6"
            cover={
              <img
                alt="example"
                src="https://media.discordapp.net/attachments/599635854713028611/1186841494561243186/F905768F-42AC-4240-BDF4-570876BEF147.jpg?ex=670d1b86&is=670bca06&hm=c692b7a9eb9a56de660c19bb38a293425735d7426d133300cdf3b0b24372a69f&=&format=webp&width=197&height=350"
              />
            }
          >
            <Meta title={item.name} description={item.description} />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllPill;
