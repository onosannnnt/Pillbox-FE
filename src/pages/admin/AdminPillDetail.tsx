import { axiosInstance } from "@/utils/axios";
import { Button, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

type pillType = {
  id: string;
  name: string;
  description: string;
  note: string;
  img: string;
};
const AdminPillDetail = () => {
  const { pillID } = useParams<{ pillID: string }>();
  const navigate = useNavigate();
  const [pill, setPill] = useState<pillType>();
  const [dataForm, setDataForm] = useState({
    name: "",
    description: "",
    note: "",
  });
  const [isLoading, setLoading] = useState<boolean>();

  const fetchPill = async () => {
    try {
      const response = await axiosInstance.get(`/admin/getMedicine/${pillID}`);
      setPill(response.data);
      setDataForm(response.data);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error",
      });
    }
  };
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };
  const handleDelelte = async () => {
    try {
      const response = await axiosInstance.delete(
        `/admin/deleteMedicine/${pillID}`
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "ลบข้อมูลยาสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/admin");
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: error instanceof Error ? error.message : "ไม่สามารถลบข้อมูลยาได้",
      });
    }
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.put(
        `/admin/editMedicine/${pillID}`,
        {
          ...dataForm,
        }
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "แก้ไขข้อมูลยาสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text:
          error instanceof Error ? error.message : "ไม่สามารถเพิ่มข้อมูลยาได้",
      });
    }
  };
  useEffect(() => {
    fetchPill();
  }, []);
  return (
    <>
      <div className="w-full h-full">
        <h1 className="text-3xl text-center">รายละเอียดยา</h1>
        <div className="flex justify-center h-1/2">
          <img src={pill?.img} alt={pill?.name} />
          <Form
            onFinish={handleSubmit}
            className="w-1/3 border p-5 bg-white drop-shadow-lg rounded-xl"
          >
            <Form.Item>
              <div className="text-lg">ชื่อยา</div>
              <input
                type="text"
                name="name"
                placeholder="ชื่อยา"
                value={dataForm.name}
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                onChange={handleFormChange}
              />
            </Form.Item>
            <Form.Item>
              <div className="text-lg">สรรพคุณ</div>
              <TextArea
                autoSize={{ minRows: 2, maxRows: 4 }}
                name="description"
                placeholder="สรรพคุณ"
                value={dataForm.description}
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                onChange={handleFormChange}
              />
            </Form.Item>
            <Form.Item>
              <div className="text-lg">หมายเหตุ</div>
              <TextArea
                autoSize={{ minRows: 2, maxRows: 4 }}
                name="note"
                placeholder="หมายเหตุ"
                value={dataForm.note}
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                onChange={handleFormChange}
              />
            </Form.Item>
            <Form.Item className="w-full flex justify-center">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="w-full"
                loading={isLoading}
              >
                เพิ่มข้อมูลยา
              </Button>
              <Button
                size="small"
                danger
                className="w-full mt-2"
                onClick={handleDelelte}
              >
                ลบข้อมูลยา
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AdminPillDetail;
