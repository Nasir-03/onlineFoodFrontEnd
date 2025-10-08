import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography, Box } from '@mui/material';
import React, { useState } from 'react'
import OrderTable from './OrderTable';

const orderStatus = [
  {label: "pending", value:"PENDING"},
  {label:"completed", value:"COMPLETED"},
  {label:"all", value:"ALL"},
]

const Order = () => {
  const [filterValue,setFilterValue] = useState("ALL");

  const handleFilter = (e,value)=> {
    setFilterValue(value)
  }

  return (
    <Box sx={{ width: '100%', px: 5 }}>
      <Card sx={{ p: 5, mb: 2, width: '100%' }}>
        <Typography sx={{ pb: 2 }} variant='h5'>Order Status</Typography>
        <FormControl>
          <RadioGroup onChange={handleFilter} row name='category' value={filterValue}>
            {orderStatus.map((item) => (
              <FormControlLabel 
                key={item.label}
                value={item.value}
                control={<Radio />}
                label={item.label}
                sx={{ color:"gray" }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Card>

      <Box sx={{ width: '100%', px: 5 }}>
        <OrderTable />
      </Box>
    </Box>
  )
}

export default Order
