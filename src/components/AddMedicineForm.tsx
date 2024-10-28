import { uploadImage } from "@/libs/supabase";
import { axiosInstance } from "@/utils/axios";
import { Button, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import Swal from "sweetalert2";

const AddMedicineForm = () => {
  const [dataForm, setDataForm] = useState({
    name: "",
    description: "",
    note: "",
    medicalName: "",
  });
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>();

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!image) {
        throw new Error("กรุณาเลือกรูปภาพ");
      }
      const imageUrl = await uploadImage("medicine", image);
      const response = await axiosInstance.post("/admin/addMedicine", {
        ...dataForm,
        img: imageUrl,
      });
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "เพิ่มข้อมูลยาสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.reload();
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
  return (
    <>
      <Form
        onFinish={handleSubmit}
        className="lg:w-1/3 border p-5 bg-white drop-shadow-lg rounded-xl"
      >
        <Form.Item>
          <div className="text-lg">ชื่อยา</div>
          <input
            type="text"
            name="name"
            placeholder="ชื่อยา"
            className="w-full p-2 border border-gray-300 rounded-lg mb-2"
            onChange={handleFormChange}
          />
        </Form.Item>
        <Form.Item>
          <div className="text-lg">ชื่อยาสามัญ</div>
          <input
            type="text"
            name="medicalName"
            placeholder="ชื่อยา"
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
            className="w-full p-2 border border-gray-300 rounded-lg mb-2"
            onChange={handleFormChange}
          />
        </Form.Item>
        {previewImage && (
          <Form.Item className="flex justify-center">
            <img src={previewImage} alt="preview" className="h-64" />
          </Form.Item>
        )}
        <Form.Item>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImage(file);
                setPreviewImage(URL.createObjectURL(file));
              }
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isLoading}
          >
            เพิ่มข้อมูลยา
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddMedicineForm;
