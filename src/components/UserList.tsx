import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import Swal from "sweetalert2";
import { axiosInstance } from "@/utils/axios";
import { useNavigate } from "react-router-dom";

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

const UserList = () => {
  const [data, setData] = useState<userDataType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const Navigate = useNavigate();
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/admin/getAllUser");
      setData(response.data);
      setLoading(false);
    } catch {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถดึงข้อมูลผู้ใช้งานได้",
      });
    }
  };
  const handleOnClick = (data: userDataType) => {
    Navigate(`/admin/profile/${data.username}`);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <h1 className="text-3xl text-center py-5">รายชื่อผู้ใช้งานกล่องยา</h1>
      <Row gutter={[16, 16]}>
        {data.map((user, index) => (
          <Col span={8} key={index}>
            <Card
              title={
                user.firstName && user.lastName ? (
                  <span className="text-xl">
                    {user.firstName} {user.lastName}
                  </span>
                ) : (
                  <span className="text-xl">{user.username}</span>
                )
              }
              bordered={false}
              loading={isLoading}
              onClick={() => handleOnClick(user)}
              className="cursor-pointer text-lg"
            >
              <p>
                ชื่อ:{" "}
                {user.firstName || (
                  <span className="text-red-600">"ยังไม่ได้ระบุชื่อจริง"</span>
                )}
              </p>
              <p>
                นามสกุล:{" "}
                {user.lastName || (
                  <span className="text-red-600">"ยังไม่ได้ระบุนามสกุล"</span>
                )}
              </p>
              <p>อีเมล: {user.email}</p>
              <p>ชื่อผู้ใช้: {user.username}</p>
              <p>จำนวนช่องในกล่องยา: {user.numberOfPillChannels}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default UserList;
