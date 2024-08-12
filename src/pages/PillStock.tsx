import { Table, TableColumnsType } from 'antd'
import React from 'react'

type TablePillStock = {
  stockId: number
  pillName: string
  totalAmount: number
  amount: number
  unit: string
}

const pillStockColumns: TableColumnsType<TablePillStock> = [
  {
    title: 'ช่องที่',
    dataIndex: 'stockId',
    key: 'stockId',
  },
  {
    title: 'ชื่อยาสามัญ',
    dataIndex: 'pillName',
    key: 'pillName',
  },
  {
    title: 'จำนวนยาทั้งหมด',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    render: (_, record) => (
      <span>
        {record.totalAmount} {record.unit}
      </span>
    ),
  },
  {
    title: 'จำนวนยาคงเหลือ',
    dataIndex: 'amount',
    key: 'amount',
    render: (_, record) => (
      <span>
        {record.amount} {record.unit}
      </span>
    ),
  },
]

const PillStock: React.FC = () => {
  const mockData: TablePillStock[] = [
    {
      stockId: 1,
      pillName: 'ยาลดความดัน',
      totalAmount: 100,
      amount: 10,
      unit: 'เม็ด',
    },
    {
      stockId: 2,
      pillName: 'ยาลดความดัน',
      totalAmount: 100,
      amount: 10,
      unit: 'เม็ด',
    },
    {
      stockId: 3,
      pillName: 'ยาลดความดัน',
      totalAmount: 100,
      amount: 10,
      unit: 'เม็ด',
    },
  ]

  return (
    <React.Fragment>
      <div className="container p-8 flex flex-col gap-y-4">
        <h1 className="text-2xl font-bold text-center">ประวัติการใช้งานกล่องยา</h1>
        <Table columns={pillStockColumns} dataSource={mockData} />
      </div>
    </React.Fragment>
  )
}

export default PillStock
