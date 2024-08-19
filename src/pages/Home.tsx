import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const generateInitData = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    boxID: (index + 1).toString(),
    pillName: "",
  }));
};

const initData = generateInitData(4);
const mockData = [
  {
    boxID: "dsadsadwasd",
    pillName: "ยาแก้ปวด",
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [pill, setPill] = useState(initData);

  useEffect(() => {
    const remainingInitData = initData.slice(mockData.length);
    setPill([...mockData, ...remainingInitData]);
  }, []);

  return (
    <React.Fragment>
      <div className="grid place-items-center h-full w-full">
        <div className="grid grid-cols-2 bg-primary-blue h-5/6 w-3/4">
          {pill.map((item, index) => {
            return (
              <div
                className="bg-primary-blue hover:bg-secondary-blue cursor-pointer grid place-items-center"
                key={index}
                onClick={() => {
                  navigate(`/pill-detail/${item}`);
                }}
              >
                <div className="text-center">
                  <h1 className="text-center text-2xl font-bold ">
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
