import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Home/Home'
import Cart from '../cart/Cart'
import Profile from '../profile/Profile'
import ResturantDetails from '../Resturant/ResturantDetails'
import Navbar from '../Navbar'
import Auth from '../Auth/Auth'
import PaymentSuccess from '../../payment/PaymentSuccess'

const CustomRouters = () => {
  return (
    <div>
        <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/account/:register' element={<Home />}/>
        <Route path='/resturant/:city/:title/:id' element={<ResturantDetails />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/my-profile/*' element={<Profile />}/>
        {/* <Route path='/payment/success/:id' element={<PaymentSuccess />}/> */}
        <Route path='/payment/success/payment/success/:id' element={<PaymentSuccess />} />
      </Routes>
      <Auth />
    </div>
  )
}

export default CustomRouters
