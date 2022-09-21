import { Box, Button, Container, Stack, Typography } from "@mui/material"
import { useState,useEffect } from "react"
import axios from "axios"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Link} from 'react-router-dom'

const OrderAdmin = () =>{
    const [data,setData] = useState([])
    useEffect(() =>{
           axios.get("http://localhost:8000/api/order")
           .then((res) =>{
              setData(res.data)
              console.log(res.data)
           })
    },[])
     return(
        <Container sx={{marginY:20}}>
          <Typography align="center" variant="h3" className="text-yellow-500">Danh sách đơn hàng</Typography>
    <TableContainer className="mt-12">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="bg-red-600">
            <TableCell align="center" className="text-slate-50">Khách hàng</TableCell>
            <TableCell align="center" className="text-slate-50">Địa chỉ giao</TableCell>
            <TableCell align="center" className="text-slate-50">Số điện thoại</TableCell>
            <TableCell align="center" className="text-slate-50">Thời gian đặt</TableCell>
            <TableCell align="center" className="text-slate-50">Tổng tiền</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((order,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">  {order.name}   </TableCell>
              <TableCell align="center">{order.address}</TableCell>
              <TableCell align="center">{order.phone}</TableCell>
              <TableCell align="center">{new Date(order.createdAt).toLocaleString()}</TableCell>
              <TableCell align="center">{order.total}</TableCell>
              <TableCell align="center">
                <Link to={`/admin/order/${order._id}`}>
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-slate-50">Xem chi tiết</Button>
                </Link>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Container>
     )
}
export default OrderAdmin