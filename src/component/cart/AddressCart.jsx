import { Button, Card } from '@mui/material'
import React from 'react'
import CottageIcon from '@mui/icons-material/Cottage';


const AddressCart = ({item,showButton,handleSelectAddress}) => {
  return (
    <Card className='flex gap-5 w-64 p-5 md-mx:w-56'>
        <CottageIcon />

        <div className='space-y-3 text-gray-400'>
            <h1 className='font-semibold text-lg text-white'> Home</h1>
            <p className='md-mx:text-sm'>
                Mumbai, new SHivam building , nagpur road ,36550,mahrastra,India
            </p>
            {showButton && 
            <Button variant='outlined' fullWidth onClick={() => handleSelectAddress(item)}>Select</Button>
            }
        </div>
    </Card>
  )
}

export default AddressCart
