import { BASE_ROUTE, HISTORY_ROUTE, PILL_STOCK_ROUTE } from '@/config/route'
import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const SideBar: React.FC = () => {
  return (
    <React.Fragment>
      <div className="bg-primary-blue text-black flex h-full w-80 flex-col justify-between py-[4rem]">
        <div className="flex flex-col justify-center">
          <img src="klongyaa.png" alt="icon" className="w-64 aspect-square self-center" />
          <div className="flex flex-col gap-y-4">
            <p className="text-center">OnO-OlO@gmail.com</p>
            <Link to={BASE_ROUTE}>
              <p className="text-center">Home</p>
            </Link>
            <Link to={HISTORY_ROUTE}>
              <p className="text-center">History</p>
            </Link>
            <Link to={BASE_ROUTE}>
              <p className="text-center">Forgetten Rate</p>
            </Link>
            <Link to={PILL_STOCK_ROUTE}>
              <p className="text-center">Pill Stock</p>
            </Link>
          </div>
        </div>
        <div className="flex w-full justify-center">
          <Button className="bg-secondary-blue">ออกจากระบบ</Button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SideBar
