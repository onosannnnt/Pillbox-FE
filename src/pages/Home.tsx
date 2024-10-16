import Loading from "@/components/Loading";
import { AuthContext } from "@/context/auth";
import { axiosInstance } from "@/utils/axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const generateInitData = (count: number) => {
  return Array.from({ length: count }, () => ({
    boxID: "",
    pillName: "",
  }));
};

type pillData = {
  id: string;
  channelIndex: number;
  amount: number;
  Total: number;
  amountPerTime: number;
  medicine: {
    id: string;
    name: string;
    description: string;
    note: string;
    img: string;
  };
};

const Home: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const initData = generateInitData(
    authContext?.auth.numberOfPillChannels || 0
  );
  const [pill, setPill] = useState(initData);

  const fetchPill = async () => {
    try {
      const response = await axiosInstance.get("/user/getPillChannels");
      const data = response.data;
      data.forEach((item: pillData) => {
        initData[item.channelIndex] = {
          boxID: item.id,
          pillName: item.medicine.name,
        };
      });
      setPill(initData);
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.status !== 401) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "กรุณาลองใหม่อีกครั้ง",
        });
      }
    }
  };

  useEffect(() => {
    fetchPill();
  }, [isLoading]);

  if (isLoading) {
    return (
      <>
        <div className="w-full h-screen content-center text-center">
          <Loading size="large" />
        </div>
      </>
    );
  }

  return (
    <React.Fragment>
      <div className="grid place-items-center h-full w-full">
        <div className="grid grid-cols-2 h-5/6 w-3/4">
          {pill.map((item, index) => {
            return (
              <div
                className="bg-primary-blue hover:bg-secondary-blue grid place-items-center cursor-pointer"
                key={index}
                onClick={() => {
                  if (item.boxID === "") return;
                  navigate(`/pill-detail/${item.boxID}`);
                }}
              >
                <div className="text-center">
                  <h1 className="text-center text-2xl font-bold">
                    กล่องที่ {index + 1}
                  </h1>
                  <h2>{item.pillName}</h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
