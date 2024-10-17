import { useEffect, useState } from "react";
import { Button, Card } from "antd";
import Swal from "sweetalert2";
import { axiosInstance } from "@/utils/axios";
import AddMedicineForm from "@/components/AddMedicineForm";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

type Medicine = {
  id: string;
  name: string;
  description: string;
  note: string;
  img: string;
};

const AllPill = () => {
  const navigate = useNavigate();
  const [medicine, setMedicine] = useState<Medicine[]>([]);
  const [isAddMedicineFormVisible, setIsAddMedicineFormVisible] =
    useState(false);
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
      <h1 className="text-3xl text-center pt-5">รายชื่อยาทั้งหมด</h1>
      <div className="flex justify-end">
        {isAddMedicineFormVisible ? (
          <Button
            onClick={() => setIsAddMedicineFormVisible(false)}
            className="m-5 lg:w-1/12"
            type="primary"
            danger
          >
            ยกเลิก
          </Button>
        ) : (
          <Button
            onClick={() => setIsAddMedicineFormVisible(true)}
            className="m-5 lg:w-1/12"
            type="primary"
          >
            เพิ่มข้อมูลยา
          </Button>
        )}
      </div>
      <div className="flex justify-center">
        {isAddMedicineFormVisible ? <AddMedicineForm /> : <div></div>}
      </div>
      <div className="lg:flex flex-wrap">
        {medicine.map((item, index) => (
          <Card
            key={index}
            hoverable
            className="m-5 lg:w-1/6 w-2/5"
            cover={<img alt="รูปยา" src={item.img} />}
            onClick={() => {
              navigate(`/admin/pill-detail/${item.id}`);
            }}
          >
            <Meta title={item.name} description={item.description} />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllPill;
