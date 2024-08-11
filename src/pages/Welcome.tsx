import { LOGIN_ROUTE } from '@/config/route'
import React from 'react'
import { Link } from 'react-router-dom'

const Welcome: React.FC = () => {
  return (
    <React.Fragment>
      <div className="bg-primary-blue h-screen py-16">
        <div className="container mx-auto bg-white rounded-md h-full grid grid-cols-2 place-items-center">
          <img src="/klongyaa.png" alt="welcome" className="w-full h-full object-contain max-w-[32rem] aspect-square" />
          <div className="grid place-items-center">
            <div className='p-20'>
              <h1 className="text-4xl font-bold text-center p-4">WELCOME TO KLONGYAA</h1>
              <p className="text-center text-2xl">
                กล่องยาดูแลผู้สูงอายุพร้อมระบบแจ้งเตือนอัตโนมัติ
                <br />
                และการป้อนข้อมูลเสียงด้วยการรู้จากคำพูด
              </p>
            </div>
            <div className='grid place-content-center'>
              <h5 className="text-center text-2xl font-bold">กรุณาเข้าสู่ระบบเพื่อใช้งาน</h5>
              <Link to={LOGIN_ROUTE} className="py-2 px-3 bg-secondary-blue rounded-2xl text-xl text-center">
                เข้าสู่ระบบ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Welcome
