import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react'

const CreateIngredientForm = () => {

    const [formdata,setFormData] = useState({name:"",IngredientCategoryId:""});

    const handleSubmit = ()=> {
       const data = {
        name:formdata.categoryName,
        resturantId:{
          id:1,
        },
       }
       console.log(data)
    }

    const handleInputChange = (e)=> {
        const {name,value} = e.target;
        setFormData({
            ...formdata,[name]:value
        })
    }

  return (
    <div>
       <div className='p-5'>
          <h1 className='text-gray-400 text-center text-xl pb-10'>Create ingredients category</h1>
      
         <form className='space-y-5' onSubmit={handleSubmit}>
           <TextField 
            fullWidth
            id="cuisineType"
            name='cuisineType'
            label="cuisineType"
            variant='outlined'
            onChange={handleInputChange}
            value={formdata.categoryName}
           />

            <Grid item size={6}>
                         <FormControl fullWidth>
                           <InputLabel id="demo-simple-select-label">Category</InputLabel>
                           <Select
                             labelId="demo-simple-select-label"
                             id="category"
                             value={formdata.IngredientCategoryId}
                             label="category"
                             onChange={handleInputChange}
                           >
                             <MenuItem value={10}>Ten</MenuItem>
                             <MenuItem value={20}>Twenty</MenuItem>
                             <MenuItem value={30}>Thirty</MenuItem>
                           </Select>
                         </FormControl>
                       </Grid>

           <Button variant='contained' type='submit'>
              create category
           </Button>
         </form>
       </div>
    </div>
  )
}

export default CreateIngredientForm
