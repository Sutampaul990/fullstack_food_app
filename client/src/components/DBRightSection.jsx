import React from 'react'
import DBHeader from './DBHeader'
import { Route, Routes } from 'react-router-dom'
import { DBHome , DBItems ,DBOrders ,DBUsers ,DBNewItems} from "../components/index";


const DBRightSection = () => {
  return (
    <div className=" flex flex-col flex-1 py-12 px-12 h-full">
      <DBHeader />
      <div className="flex flex-col flex-1 overflow-y-scroll scrollbar-none">
        <Routes>
            <Route path="/home" element={<DBHome />} />
            <Route path="/orders" element={<DBOrders />} />
            <Route path="/items" element={<DBItems />} />
            <Route path="/addNewItems" element={<DBNewItems />} />
            <Route path="/users" element={<DBUsers />} />
        </Routes>
      </div>
    </div>
  )
}

export default DBRightSection
