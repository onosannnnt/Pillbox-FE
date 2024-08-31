import customizeRequiredMark from "@/components/customizeRequiredMark";
import { BASE_ROUTE } from "@/config/route";
import { AuthContext } from "@/context/auth";
import { axiosInstance } from "@/utils/axios";
import { Button, Form, Input, Typography } from "antd";
import { isAxiosError } from "axios";
import React, { useContext, useEffect } from "react";
import Swal from "sweetalert2";

type UserLogin = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const authContext = useContext(AuthContext);
  const onFinish = async () => {
    try {
      const data: UserLogin = form.getFieldsValue();

      const response = await axiosInstance.post("/user/login", {
        emailOrUsername: data.username,
        password: data.password,
      });
      if (response.status != 200) {
        throw new Error("Login failed");
      }
      Swal.fire({
        icon: "success",
        title: "เข้าสู่ระบบสำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.href = BASE_ROUTE;
      });
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          Swal.fire({
            icon: "error",
            title: "เข้าสู่ระบบไม่สำเร็จ",
            text: "กรุณาลองใหม่อีกครั้ง",
          });
          return;
        } else {
          Swal.fire({
            icon: "error",
            title: "ระบบขัดข้อง",
            text: "กรุณาลองใหม่อีกครั้ง",
          });
          return;
        }
      }
    }
  };
  useEffect(() => {
    if (authContext?.auth.isAuth) {
      window.location.href = BASE_ROUTE;
    }
  }, [AuthContext]);

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
          </div>
          <div>
            <Title level={2} className="text-center">
              เข้าสู่ระบบเพื่อใช้งาน
            </Title>
            <Form
              form={form}
              layout="vertical"
              scrollToFirstError
              onFinish={onFinish}
              requiredMark={customizeRequiredMark}
            >
              <Form.Item
                label={<p className="text-2xl">ชื่อผู้ใช้</p>}
                name="username"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อผู้ใช้",
                  },
                ]}
              >
                <Input placeholder="Username" size="large" />
              </Form.Item>
              <Form.Item
                label={<p className="text-2xl">รหัสผ่าน</p>}
                name="password"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกรหัสผ่าน",
                  },
                  {
                    min: 8,
                    message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัว",
                  },
                ]}
              >
                <Input placeholder="Password" type="password" size="large" />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full py-2 px-3 bg-secondary-blue rounded-2xl text-xl text-center"
              >
                เข้าสู่ระบบ
              </Button>
            </Form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
