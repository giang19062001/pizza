import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions,Grid} from '@mui/material';
import { Container } from '@mui/system';
import axios from "axios";
import { useDispatch } from 'react-redux';

import { addCart } from '../redux/cart/cartSlice';

export default function Pizza() {
  
  const [data,setData] = React.useState([]);



  const dispatch = useDispatch();


  React.useEffect(()=>{
    axios.get(process.env.REACT_APP_SERVER + `api/pizza`)
    .then((response) => {
      setData(response.data);
    });
  },[])


  const hanldeAdd = async (id) =>{
   await axios.get(process.env.REACT_APP_SERVER + `api/pizza/${id}`)
    .then((response) => {
      dispatch(addCart({...response.data,quantity:1}))
    });
  }

  return (
  
    <Container  className='p-12' sx={{marginTop:15}}>
      <Grid container spacing={2}>
      {data?.map((pizza,index) =>(
          <Grid item xs={12} md={3} className='pb-6'  key={index}>
            <Card className='w-64  mx-auto'>
            <CardActionArea sx={{cursor:"auto"}}>
              <CardMedia
                component="img"
                image={process.env.REACT_APP_SERVER + pizza.photo}
                className="hover:scale-110"
              />
              <CardContent>
                <Typography align='center'>
                  {pizza.name}
                </Typography>
                <Typography  align='center' className='text-red-700 font-semibold' >
                  {pizza.price} đ
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              {pizza.display === true ?(
              <Button className='mx-auto text-slate-50 bg-red-500 hover:bg-yellow-400 rounded-full p-2 m-1' 
              onClick={()=> hanldeAdd(pizza._id)}>
                  Mua hàng
              </Button>
              )
            :(
             <Typography className='bg-slate-200 rounded-full p-3 text-red-600 mx-auto' >Sản phẩm ngừng bán</Typography>
            )}
            </CardActions>
            </Card>
            </Grid>
      ))}
   
   </Grid>
    </Container>

  );
}
