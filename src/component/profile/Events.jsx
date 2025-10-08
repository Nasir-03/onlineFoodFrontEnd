import React from 'react'
import EventCard from './EventCard'

const Events = () => {
  return (
    <div className='text-white space-x-5'>
      <h1 className='text-xl font-semibold text-center'>Event</h1>
      <div className='flex space-x-4 pt-3 flex-wrap space-y-5'>
      {
        [1,1,1,1,1,1,1].map((item)=><EventCard />)
      }
      </div>
    </div>
  )
}

export default Events
