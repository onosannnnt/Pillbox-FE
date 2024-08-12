import { Select, Table, TableColumnsType } from 'antd'
import React from 'react'

type TableHistory = {
  date: Date
  time: string
  status: string
}

const historyColumns: TableColumnsType<TableHistory> = [
  {
    title: 'วัน / เดือน / ปี',
    dataIndex: 'date',
    key: 'date',
    render: (date: Date) => date.toLocaleDateString(),
  },
  {
    title: 'เวลา',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'รายการการเเจ้งเตือน',
    dataIndex: 'status',
    key: 'status',
  },
]

const History: React.FC = () => {
  const data: TableHistory[] = [
    {
      date: new Date(),
      time: '08:00',
      status: 'ระบบเเจ้งเตือนเวลารับประทานยาลดความดัน',
    },
    {
      date: new Date(),
      time: '08:00',
      status: 'ระบบเเจ้งเตือนเวลารับประทานยาลดความดัน',
    },
    {
      date: new Date(),
      time: '08:00',
      status: 'ผู้ใช้หยิบยา',
    },
  ]

  return (
    <React.Fragment>
      <div className="container p-8 flex flex-col gap-y-4">
        <h1 className="text-2xl font-bold text-center">ประวัติการใช้งานกล่องยา</h1>
        <div className="flex w-full justify-end">
          <Select
            className="w-64"
            size="large"
            placeholder="เลือกเดือน"
            defaultValue={'week'}
            options={[
              {
                label: 'สัปดาห์นี้',
                value: 'week',
              },
              {
                label: 'เดือนนี้',
                value: 'month',
              },
              {
                label: 'เดือนที่แล้ว',
                value: 'last_month',
              },
            ]}
          />
        </div>
        <div className="bg-white rounded-xl grid grid-cols-2 py-4 px-2">
          <p className="text-center font-semibold">สรุปการรับประทานยา/การลืมรับประทานยา</p>
          <div className="flex flex-col gap-y-4">
            <div className="grid grid-cols-2">
              <p className="content-center text-center">รับประทานยา</p>
              <div className="flex justify-center">
                <p className="bg-secondary-blue py-2 px-4 border border-black rounded-xl">10 ครั้ง</p>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <p className="content-center text-center">ลืมรับประทานยา</p>
              <div className="flex justify-center">
                <p className="bg-secondary-blue py-2 px-4 border border-black rounded-xl text-red-600">10 ครั้ง</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Table columns={historyColumns} dataSource={data} />
        </div>
      </div>
    </React.Fragment>
  )
}

export default History
