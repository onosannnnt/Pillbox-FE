import { Avatar, Form } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { axiosInstance } from "@/utils/axios";
import ProfileTotalTask from "../ProfileTotalTask";
import PillStock from "@/components/PillStock";
import History from "@/components/History";

type userDataType = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  username: string;
  lineID: string;
  password: string;
  role: string;
  numberOfPillChannels: number;
};
const Profile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState<userDataType>();

  const Navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get(`/admin/getUser/${username}`);
      setUserData(response.data);
    } catch {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถดึงข้อมูลผู้ใช้งานได้",
      });
    }
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(
        `/admin/editUser/${userData?.id}`,
        userData
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "บันทึกข้อมูลสำเร็จ",
          text: "ข้อมูลได้รับการบันทึกแล้ว",
          timer: 1000,
        }).then(() => {
          Navigate("/admin");
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง",
      });
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      if (!prev) return prev;
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <>
      <div className="h-full w-full flex flex-col items-center gap-10 py-10">
        <h1 className="text-4xl">ข้อมูลผู้ใช้งาน</h1>
        <div className="w-full grid grid-cols-1 lg:flex justify-around items-center">
          <div className="h-full w-full lg:w-3/5 flex gap-10">
            <div className="bg-white w-full h-fit rounded-lg shadow-md">
              <div className="w-full h-full lg:flex justify-center lg:justify-around px-3 py-10 hidden">
                <div className="grid lg:flex flex-col justify-center items-center w-1/2">
                  <Avatar shape="square" size={200} icon={<UserOutlined />} />
                </div>
                <form
                  className="w-3/4 h-full flex flex-col items-center justify-around text-xl"
                  onSubmit={handleOnSubmit}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5">
                    <div className="flex flex-col">
                      <label className="text-2xl">ชื่อจริง</label>
                      <input
                        type="text"
                        className="border-gray-300 rounded-md px-3 focus:border p-1"
                        value={userData?.firstName || ""}
                        placeholder="ชื่อจริง"
                        name="firstName"
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-2xl">นามสกุล</label>
                      <input
                        type="text"
                        className="border-gray-300 rounded-md px-3 focus:border p-1"
                        value={userData?.lastName || ""}
                        placeholder="นามสกุล"
                        name="lastName"
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-2xl">อีเมล</label>
                      <input
                        type="text"
                        className="border-gray-300 rounded-md px-3 focus:border p-1"
                        value={userData?.email || ""}
                        placeholder="example@mail.com"
                        name="email"
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-2xl">บัญชีผู้ใช้งาน</label>
                      <input
                        type="text"
                        className="border-gray-300 rounded-md px-3 focus:border p-1"
                        value={userData?.username || ""}
                        placeholder="username"
                        name="username"
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-2xl">จำนวนช่องในกล่องยา</label>
                      <input
                        type="number"
                        min={0}
                        className="border-gray-300 rounded-md px-3 focus:border p-1"
                        value={userData?.numberOfPillChannels || ""}
                        placeholder="example@mail.com"
                        name="numberOfPillChannels"
                        onChange={handleOnChange}
                      />
                    </div>
                  </div>
                  <div className="w-full h-full flex justify-end gap-5 px-10">
                    <button
                      className="lg:w-1/6 w-full rounded-md text-red-500 border border-red-500 p-2 hover:bg-red-500 hover:text-white"
                      type="reset"
                      onClick={() => fetchUserData()}
                    >
                      ยกเลิก
                    </button>
                    <button
                      className="lg:w-1/6 w-full rounded-md text-green-500 border border-green-500 p-2 hover:bg-green-500 hover:text-white"
                      type="submit"
                    >
                      บันทึก
                    </button>
                  </div>
                </form>
              </div>
              <div className="lg:hidden">
                <Form
                  className="p-10"
                  layout="vertical"
                  onSubmitCapture={handleOnSubmit}
                >
                  <Form.Item>
                    <label>ชื่อจริง</label>
                    <input
                      type="text"
                      name="firstName"
                      value={userData?.firstName ?? ""}
                      onChange={handleOnChange}
                      className="w-full p-2 border-2 border-gray-300 rounded-md"
                    />
                  </Form.Item>
                  <Form.Item>
                    <label>นามสกุล</label>
                    <input
                      type="text"
                      name="lastName"
                      value={userData?.lastName ?? ""}
                      onChange={handleOnChange}
                      className="w-full p-2 border-2 border-gray-300 rounded-md"
                    />
                  </Form.Item>
                  <Form.Item>
                    <label>บัญชีผู้ใช้งาน</label>
                    <input
                      type="text"
                      name="username"
                      value={userData?.username}
                      onChange={handleOnChange}
                      className="w-full p-2 border-2 border-gray-300 rounded-md"
                    />
                  </Form.Item>
                  <Form.Item>
                    <label>อีเมลล์</label>
                    <input
                      type="email"
                      name="email"
                      value={userData?.email}
                      onChange={handleOnChange}
                      className="w-full p-2 border-2 border-gray-300 rounded-md"
                    />
                  </Form.Item>
                  <Form.Item>
                    <label>จำนวนช่องในกล่องยา</label>
                    <input
                      type="text"
                      name="lineID"
                      value={userData?.numberOfPillChannels}
                      onChange={handleOnChange}
                      className="w-full p-2 border-2 border-gray-300 rounded-md"
                    />
                  </Form.Item>
                  <button
                    type="submit"
                    className="w-full bg-primary-blue text-white p-2 rounded-md"
                  >
                    บันทึก
                  </button>
                </Form>
              </div>
            </div>
          </div>
          <div className="h-fit w-full lg:w-1/4 flex gap-10">
            <ProfileTotalTask />
          </div>
        </div>
        <div className="h-full w-full flex justify-center">
          <div className="bg-white w-11/12 h-full rounded-lg shadow-md">
            <PillStock />
          </div>
        </div>
        <div className="w-11/12">
          <div className="bg-white w-full h-full rounded-lg shadow-md">
            <History />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
