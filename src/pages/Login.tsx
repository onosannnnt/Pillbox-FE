import customizeRequiredMark from "@/components/customizeRequiredMark";
import { BASE_ROUTE } from "@/config/route";
import { AuthContext } from "@/context/auth";
import { axiosInstance } from "@/utils/axios";
import { Button, Form, Input } from "antd";
import { isAxiosError } from "axios";
import { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

type UserLogin = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const [form] = Form.useForm();
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
        <div className="container mx-auto bg-white rounded-md h-full flex flex-col justify-start p-20 items-center lg:grid lg:grid-cols-2 lg:place-items-center">
          <div>
            <img
              src="/klongyaa.png"
              alt="welcome"
              className="w-full h-full object-contain max-w-[16rem] lg:max-w-[32rem] aspect-square lg:aspect-none"
            />
          </div>
          <div className="w-full flex flex-col justify-center items-center  ">
            <h1 className="text-center text-3xl pb-5">
              เข้าสู่ระบบเพื่อใช้งาน
            </h1>
            <Form
              name="login"
              form={form}
              size="large"
              initialValues={{ remember: true }}
              style={{ maxWidth: 360 }}
              onFinish={onFinish}
              requiredMark={customizeRequiredMark}
              className="w-full"
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "กรุณาใส่ชื่อผู้ใช้งานหรืออีเมลล์",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>
              <Form.Item
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
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button block type="primary" htmlType="submit">
                  เข้าสู่ระบบ
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
