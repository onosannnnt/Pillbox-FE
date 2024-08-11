import { LOGIN_ROUTE } from '@/config/route'
import React from 'react'
import { Link } from 'react-router-dom'

const Welcome: React.FC = () => {
  return (
    <React.Fragment>
      <div className="bg-primary-blue h-screen py-16">
        <div className="container mx-auto bg-white rounded-md h-full grid grid-cols-2">
          <div>
            <img />
          </div>
          <div className="">
            <div>
              <h1 className="text-3xl font-bold text-center">WELCOME TO KLONGYAA</h1>
              <p className="text-center">
                กล่องยาดูแลผู้สูงอายุพร้อมระบบแจ้งเตือนอัตโนมัติ
                <br />
                และการป้อนข้อมูลเสียงด้วยการรู้จากคำพูด
              </p>
            </div>
            <div>
              <h5 className="text-lg text-center">กรุณาเข้าสู่ระบบเพื่อใช้งาน</h5>
              <Link to={LOGIN_ROUTE} className="py-2 px-3 bg-primary-blue rounded-2xl text-xl">
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
