import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateResturantForm from '../../../AdminComponent/CreateResturantForm'
import Admin from '../../../AdminComponent/Admin/Admin'
import { useSelector } from 'react-redux'

const AdminRouter = () => {
  // const resturant = useSelector((state)=>state.)

  return (
    <div>
      <Routes>
        <Route path='/*' element={false?<CreateResturantForm />:<Admin />}/>
      </Routes>
    </div>
  )
}

export default AdminRouter
