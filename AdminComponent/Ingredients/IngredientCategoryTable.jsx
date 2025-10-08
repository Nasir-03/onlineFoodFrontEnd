import { Box, Card, CardHeader, Fade, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateFoodCategory from '../FoodCategory/CreateFoodCategory';

const orders = [1,1,1,1];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const IngredientCategoryTable = () => {

   const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <Box>
        <Card className='mt-1'>
            <CardHeader
            action={
                <IconButton onClick={handleOpen} aria-label='settings'>
                   <CreateIcon />
                </IconButton>
            } 
            title={"Ingredients category"}
            sx={{pt:2, alignItems:"center"}}
            />
        </Card>

         <TableContainer component={Paper}>
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Id</TableCell>
            <TableCell align="left">Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{"images"}</TableCell>
              <TableCell align="left">{"codewithNasir@gmail.com"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

   
    </Box>
  )
}

export default IngredientCategoryTable
