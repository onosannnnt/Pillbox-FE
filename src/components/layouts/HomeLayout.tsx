import SideBar from '@/components/sidebar'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const HomeLayout: React.FC<Props> = (props) => {
  return (
    <React.Fragment>
      <div className="flex w-full">
        <div className="sticky left-0 top-0 h-screen bg-white">
          <SideBar />
        </div>
        <div className="w-full">{props.children}</div>
      </div>
    </React.Fragment>
  )
}

export default HomeLayout
