import React, { useState } from "react";
import { Typography } from "antd";
import { axiosInstance } from "@/utils/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const Navigate = useNavigate();
  const { Title } = Typography;
  const [user, setUser] = useState({
    emailOrUsername: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    console.log(user);
  };

  const onSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/user/login", user);
      if (response.status != 200) {
        throw new Error("Login failed");
      }
      Swal.fire({
        icon: "success",
        title: "เข้าสู่ระบบสำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        Navigate("/home");
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="bg-primary-blue h-screen py-16">
        <div className="container mx-auto bg-white rounded-md h-full grid grid-cols-2 place-items-center">
          <div>
            <img
              src="/klongyaa.png"
              alt="welcome"
              className="w-full h-full object-contain max-w-[32rem] aspect-square"
            />
            <Title level={2} className="text-center">
              ยินดีต้อนรับเข้าสู่กล่องยา
            </Title>
          </div>
          <div>
            <form onSubmit={onSubmit}>
              <Title level={2} className="text-center">
                เข้าสู่ระบบเพื่อใช้งาน
              </Title>
              <label htmlFor="username" className="block text-2xl">
                ชื่อผู้ใช้
              </label>
              <input
                type="text"
                name="emailOrUsername"
                onChange={onChange}
                className="w-full p-2 my-2 border border-gray-300 rounded-md"
                placeholder="Username or Email"
              />
              <label htmlFor="username" className="block text-xl">
                รหัสผ่าน
              </label>
              <input
                type="password"
                name="password"
                onChange={onChange}
                className="w-full p-2 my-2 border border-gray-300 rounded-md"
                placeholder="รหัสผ่าน"
              />
              <button className="w-full py-2 px-3 bg-secondary-blue rounded-2xl text-xl text-center">
                เข้าสู่ระบบ
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
