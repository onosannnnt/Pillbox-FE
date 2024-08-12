import React from 'react'

const Home: React.FC = () => {
  const eight = [1, 2, 3, 4, 5, 6, 7, 8]
  return (
    <React.Fragment>
      <div className="bg-slate-200 grid place-items-center h-full w-full">
        <div className="grid grid-cols-2 bg-primary-blue h-5/6 w-3/4">
          {eight.map((item) => {
            return (
              <div
                className="bg-primary-blue hover:bg-secondary-blue cursor-pointer grid place-items-center"
                key={item}
                onClick={() => {
                  console.log(item)
                }}
              >
                <div className="text-center">
                  <h1 className="text-center text-2xl font-bold ">กล่องที่ {item}</h1>
                  <h2>ชื่อยา</h2>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home
