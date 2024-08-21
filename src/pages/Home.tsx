import { AuthContext } from "@/context/auth";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const generateInitData = (count: number) => {
  return Array.from({ length: count }, () => ({
    boxID: "",
    pillName: "",
  }));
};

const Home: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const initData = generateInitData(
    authContext?.auth.numberOfPillChannels || 0
  );
  const [pill, setPill] = useState(initData);

  useEffect(() => {
    const mockData = [
      {
        boxID: "dsadsadwasd",
        pillName: "ยาแก้ปวด",
      },
      {
        boxID: "dsadsadwasds",
        pillName: "ยาแก้ปวด",
      },
      {
        boxID: "dsadsadwasdq",
        pillName: "ยาแก้ปวด",
      },
    ];
    const remainingInitData = initData.slice(mockData.length);
    setPill([...mockData, ...remainingInitData]);
  }, [authContext]);

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
