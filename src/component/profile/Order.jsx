import { Button, Card } from '@mui/material'
import React, { useEffect } from 'react'
import OrderCard from './OrderCard'
import { getUserOrderService } from '../service/OrderService'

const Order = () => {

   const[orders,setOrders] = React.useState([])
    const jwt = localStorage.getItem('jwt');
  
    useEffect(() => {
      const fetchOrders = async () => {
        try{
            const data = await getUserOrderService(jwt);
        setOrders(data);
        }catch(err){
          console.log(err);
        }
      };
      fetchOrders();
    },[jwt]);
  
    useEffect(()=>{
      console.log(orders);
    },[orders]);

  return (
    <div className='flex flex-col items-center'>
      <div className='p-5 font-semibold'>
        My Orders
      </div>
      <div className='space-y-5 w-full lg:w-1/2'>
        {
          orders.map((item) => (
            item.orderItems.map((orderItem) => (
              <OrderCard key={orderItem.id} order={orderItem} />
            ))
          ))
        }
        </div>
    </div>
  )
}

export default Order
