import { Container, Paper, Typography, Stack,Box, Divider } from "@mui/material"
import { useState,useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

const OrderDetailAdmin = () =>{
    const [data,setData] = useState() 
    const params = useParams()
    useEffect(()=>{
       axios.get(process.env.REACT_APP_SERVER +`api/order/${params.id}`)
       .then((res)=>{
          setData(res.data)
          console.log(res.data)
       })
    },[])
   return(
       <Container sx={{marginY:20}}>
            <Paper className="p-8" elevation={3}>
                <Typography variant="h5" align="center" className="text-red-500 font-bold mb-6 ">Mã đơn hàng : {data?._id}</Typography>
                <Divider/>
                <Stack  spacing={4} className="mt-12">
                {data?.orderDetail.map((order,index)=>(
                        <Box key={index} className="flex flex-col md:flex-row justify-evenly items-center  ">
                            <img src={process.env.REACT_APP_SERVER + order.photo} alt="" className="w-40"/>
                            <Typography>{order.name}</Typography>
                            <Typography>Số lượng : {order.quantity}</Typography>
                        </Box>
                ))}
                  </Stack>
            </Paper>
       </Container>
   )

}
export default OrderDetailAdmin