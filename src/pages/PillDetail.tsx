import Loading from "@/components/Loading";
import { axiosInstance } from "@/utils/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import parse from "html-react-parser";

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
    medicalname: string;
  };
  times: {
    time: string;
  }[];
};

const PillDetail = () => {
  const { pillID } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [pill, setPill] = useState<pillData>();

  const fetchPill = async () => {
    try {
      const response = await axiosInstance.get(
        `/user/getPillChannel/${pillID}`
      );
      setPill(response.data);
      setIsLoading(false);
    } catch {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาลองใหม่อีกครั้ง",
      });
    }
  };

  useEffect(() => {
    fetchPill();
    console.log(pill);
  }, []);

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
    <>
      <h1 className="lg:text-4xl text-2xl text-center p-5">
        ข้อมูลยาช่องที่{" "}
        {pill?.channelIndex !== undefined ? pill.channelIndex + 1 : ""}
      </h1>
      <div className="flex flex-col divide-y-8">
        {" "}
        <div className="flex flex-col items-center gap-x-2">
          <div className="flex lg:w-1/2 w-full justify-center lg:justify-normal px-10 py-4">
            <b className="lg:text-2xl text-lg px-6">ชื่อยาสามัญ : </b>
            <div className="lg:text-2xl text-lg">{pill?.medicine.name}</div>
          </div>
          <div className="flex lg:w-1/2 w-full justify-center lg:justify-normal px-10 py-4">
            <b className="lg:text-2xl text-lg px-6">ชื่อยาทางการแพทย์ : </b>
            <div className="lg:text-2xl text-lg">
              {pill?.medicine.medicalname}
            </div>
          </div>
          <div className="flex lg:w-1/2 w-full justify-center lg:justify-normal px-10 py-4">
            <b className="font-bold lg:text-2xl text-lg px-6 text-right">
              จำนวนยาที่เหลือ :
            </b>
            <div className="text-lg lg:text-2xl">{pill?.amount} เม็ด</div>
          </div>
          <div className="flex lg:w-1/2 w-full justify-center lg:justify-normal px-10 py-4">
            <b className="font-bold lg:text-2xl text-lg px-6">
              จำนวนยาที่ต้องทาน<br className="lg:hidden"></br>ในแต่ละครั้ง :
            </b>
            <div className="text-md lg:text-2xl">
              {pill?.amountPerTime} เม็ด/มื้อ
            </div>
          </div>
          <div className="flex lg:w-1/2 w-full justify-center lg:justify-normal px-10 py-4">
            <b className="font-bold lg:text-2xl text-lg px-6">เวลาทานยา : </b>
            <div className="grid gap-4">
              {" "}
              {pill?.times.map((item, index) => {
                return (
                  <div key={item.time} className="lg:text-2xl text-lg">
                    ครั้งที่ {index + 1} : {item.time} น.
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-x-2">
          <h1 className="lg:text-3xl text-2xl text-center p-5">
            คุณสมบัติของ <b>{pill?.medicine.name}</b>
          </h1>
          <div className="flex lg:w-1/2 w-full justify-center lg:justify-normal px-10 py-4">
            <b className="lg:text-2xl text-lg px-6">ชื่อยาทางการแพทย์ : </b>
            <div className="lg:text-2xl text-lg">
              {pill?.medicine.medicalname}
            </div>
          </div>
          <div className="flex w-full lg:w-1/2 px-10 py-4 justify-center lg:justify-normal">
            <b className="font-bold text-lg lg:text-2xl px-6 text-right">
              สรรพคุณ :{" "}
            </b>
            <div className="text-lg lg:text-2xl">
              {parse(pill?.medicine.description) || ""}
            </div>
          </div>
          <div className="flex w-full lg:w-1/2 px-10 py-4 justify-center lg:justify-normal">
            <b className="font-bold text-lg lg:text-2xl px-6 text-right">
              หมายเหตุ :{" "}
            </b>
            <div className="text-lg lg:text-2xl">
              {parse(pill?.medicine.note || "")}
            </div>
          </div>
          <div className="flex w-1/2 px-10 py-4">
            <img src={pill?.medicine.img}></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default PillDetail;
