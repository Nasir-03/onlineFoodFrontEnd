import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRouter from './AdminRouter'
import CustomRouters from './CustomRouters'

const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path='/admin/resturant/*' element={<AdminRouter />}> </Route>
        <Route path='/*' element={<CustomRouters />}></Route>
      </Routes>
    </div>
  )
}

export default Routers
