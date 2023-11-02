import React from 'react'
import { DBLeftSection, DBRightSection } from '../components'

const Dashboard = () => {
  return (
    <div className=" w-screen h-screen items-center flex bg-primary">
      <DBLeftSection />
      <DBRightSection />
    </div>
  )
}

export default Dashboard
