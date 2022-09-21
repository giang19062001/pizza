import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material"
import { useState,useEffect } from "react"
import axios from "axios"
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { startCreatePizza } from "../redux/pizza/pizzaAction";

const PizzaAdmin = () =>{
    const [data,setData] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [pizza,setPizza] = useState({
        name:"",
        price:"",
        photo: null
    })

    const handleChange = (event) =>{
      setPizza((preState) =>({
        ...preState,
        [event.target.name] : event.target.value
      }))
    }
      
  const handleImage = (event) => {
    const files = event.target.files;
    const file = files[0];
    setPizza((preState) => ({
      ...preState,
      photo: file,
    }));
  };

  const handleAdd = () =>{
    dispatch(startCreatePizza({pizza,navigate}))
  }
    useEffect(() =>{
           axios.get(process.env.REACT_APP_SERVER +"api/pizza")
           .then((res) =>{
              setData(res.data)
              console.log(res.data)
           })
    },[])

      
  const handleUnBlock = (id) =>{
    axios.put(process.env.REACT_APP_SERVER +`api/pizza/${id}`,{display:true})
     .then(()=>{
       navigate(0)
     })
 } 
 const handleBlock = (id) =>{
   axios.put(process.env.REACT_APP_SERVER +`api/pizza/${id}`,{display:false})
    .then(()=>{
      navigate(0)
    })
 } 
     return(
        <Container sx={{marginY:20}}>
            <Stack spacing={2} direction="column" className="mb-12">
                <Typography textAlign='center' variant="h3" color='darkorange'>Thêm Pizza</Typography>
                <TextField type="text" name="name" onChange={handleChange}></TextField>
                <TextField type="text" name="price" onChange={handleChange}></TextField>
                <TextField type="file" name="photo"  onChange={handleImage}></TextField>
                <Button className="bg-orange-500 hover:bg-orange-600 text-slate-50" onClick={handleAdd}>Thêm Pizza mới</Button>

            </Stack>
             <Stack spacing={2} className="mt-12">
                {data.map((pizza,index)=>(
                    <Box key={index} className='flex flex-col sm:flex-row justify-between items-center '>
                        <img src={process.env.REACT_APP_SERVER + pizza.photo} alt=""/>
                         <Typography className="text-xl">{pizza.name}</Typography>
                         <Typography className="text-xl">{pizza.price}</Typography>
                         {pizza.display === true ?(
                         <Button className="bg-red-500 hover:bg-red-600 text-slate-50" onClick={() => handleBlock(pizza._id)}>Khóa</Button>
                         ) :(
                          <Button className="bg-yellow-500 hover:bg-yellow-600 text-slate-50" onClick={()=>handleUnBlock(pizza._id)}>Mở Khóa</Button>
                         )}
                    </Box>
                ))}
             </Stack>
        </Container>
     )
}
export default PizzaAdmin