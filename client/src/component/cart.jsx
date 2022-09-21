import { Container,Box, Typography, Button, Grid, Divider, TextField,Stack,Alert   } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeCart } from '../redux/cart/cartSlice';
import { useState,useEffect } from 'react';
import Map from './map';
import { styled } from '@mui/material/styles';
import {auth} from '../firebase'
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { startOrder,createOrderShutdown } from '../redux/order/orderAction';
import Payment from './payment';
import AlertDialog from './dialog';
import { PayPalButton } from "react-paypal-button-v2";
import { io } from "socket.io-client";



const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: 50
    },
  },
});

const Cart = () =>{
    const socket = io(process.env.REACT_APP_SERVER ) 
    const cartList = useSelector(state => state.cart.carts);
    const orderStatus = useSelector(state => state.order.status);

    const [total,setTotal] = useState(0);
    const [ship,setShip] = useState(0);
    const [payment,setPayment] = useState(false);


    //firebase-phone
    const [number, setNumber] = useState("");
    const [flag, setFlag] = useState(false);
    const [otp, setOtp] = useState("");
    const [result, setResult] = useState("");
    const [vetify, setVetify] = useState(false);
    //order
    const [order,setOrder] = useState({
      name:"",
      phone:"",
      address:"",
      note:"",
      orderDetail:[],
      total:0,
      ship:0,
      sumPrice:0
    })

    const dispatch = useDispatch();
     
   const remove = (id) =>{
        dispatch(removeCart(id))
   }

   useEffect(()=>{
     const totalSum = cartList?.reduce(
       (preValue, currentValue)=>preValue + currentValue.price * currentValue.quantity,0)
     setTotal(totalSum)
     setOrder((preState =>({
      ...preState,
      orderDetail:cartList,
      ship:ship,
      total:total,
      sumPrice:ship+total
    })))
   },[cartList, ship, total])

 const  callbackFunctionMap = (distance,addressValue) => {

  let khoangcachFinal = 0;
  const khoangcach =  distance.split(/\s/)?.[0]     // chuyển doi
  if(khoangcach.includes(",")){
    khoangcachFinal = Math.ceil(Number(khoangcach.replace(",",".")))
  }else{
    khoangcachFinal = Number(khoangcach.split(".").join(""))
  }

  setShip(5000 * khoangcachFinal) 
    setOrder((preState =>({
      ...preState,
      address:addressValue,
    })))
  }

  const callbackFunctionPayment = (radioValue) =>{
    if(radioValue === 'offline'){
      setPayment(false)
    }else{
      setPayment(true)
      setVetify(false)
    }
  }
  const callbackFuntionDialog = (value) =>{

    dispatch(createOrderShutdown())
  }

  function setUpRecaptha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }
  const getOtp = async () => {
    const num  = ("+84".concat(number.slice(1,number.length))); // đổi thành số vùng vn
    try {
      const response = await setUpRecaptha(num);
      setResult(response);
      setFlag(true);
    } catch (err) {
      console.warn(err.message);
    }
  };

  const verifyOtp = async () => {
    try {
      await result.confirm(otp);
      setFlag(false);
      setVetify(true)

    } catch (err) {
      setFlag(true);
      setVetify(false)
      console.error(err.message);
    }
  };

  const handleOrder = () =>{
    console.log(socket.id)
    dispatch(startOrder({order,socket}))
  }
  
    return (
        <Container className='p-12' sx={{marginTop:15}}>
          <Typography className='text-4xl sm:text-6xl font-mono text-yellow-500 font-bold mb-12' align='center'>Giỏ hàng</Typography>
                <Box>
                {cartList?.map((cart,index) =>(
                    <Box key={index} className='mb-5 flex  flex-wrap  '>
                        <img src={ process.env.REACT_APP_SERVER +cart.photo} alt='' className='md:flex-initial flex-auto p-2 border'/>
                        <Box className=' flex-auto flex flex-col md:flex-row p-0 md:p-12'>
                        <Typography className='text-xl flex-auto' align='center'>{cart.name}</Typography>
                        <Typography className='text-xl flex-auto text-red-500' align='center'>Gía : {cart.price} đ</Typography>
                        <Typography className='text-xl flex-auto' align='center'>Số lượng : {cart.quantity}</Typography>   
                        <Button className='flex-auto bg-red-500 hover:bg-red-700 text-slate-50 h-12 w-40 md:w-12 mx-auto  my-3 md:my-0'
                         onClick={()=>remove(cart._id)}>Xóa</Button>
                        </Box>
                    </Box>
                ))}
                </Box>
                <Divider/>
                <Box className='mb-12 mt-6'>
                    <Map  parentCallback={callbackFunctionMap}></Map>
                </Box>
                <Grid container spacing={2} >
                        <Grid item xs={12} md={6} className='mb-6 p-2'>
                          {flag === false 
                          ?(
                            <>
                            <Stack direction={'row'} spacing={2} className='mt-2'>
                              <CssTextField
                              id="custom-css-outlined-input"
                              type='text'
                              label='Số điện thoại'
                              placeholder='Vui lòng nhập số điện thoại'
                              className='w-96'
                              onChange={(e)=> {setNumber(e.target.value);setVetify(false);
                                setOrder((preState =>({
                                  ...preState,
                                  phone:e.target.value,
                                })))}}
                              ></CssTextField>

                                <Button
                                className='text-xs w-28 sm:w-24 h-14 bg-red-500 hover:bg-red-600 text-slate-50 rounded-full'
                                onClick={getOtp}
                                >
                                  Gửi mã OTP
                                </Button>

                           </Stack>
                        <Box className='mt-2' id="recaptcha-container"></Box>
                        {vetify === true ?(<Alert severity="success">Xác thực thành công</Alert>) :null}
                        </>
                          )
                           :(
                            <Stack direction={'row'} spacing={2} className='mt-2'>
                            <CssTextField
                            id="custom-css-outlined-input"
                             type='text'
                             label='Mã OTP'
                             placeholder='Vui lòng nhập mã OTP'
                             className='w-96'
                             onChange={(e)=>setOtp(e.target.value)}
                             ></CssTextField>
                             <Button
                             className='text-xs w-28 sm:w-24 h-14 bg-red-500 hover:bg-red-600 text-slate-50 rounded-full'
                             onClick={verifyOtp}
                             >
                               Xác thực OTP
                             </Button>
                        </Stack>
                           )}
                        
                          <Stack direction='column'>
                          <CssTextField
                              id="custom-css-outlined-input"
                               type='text'
                               label='Họ và tên'
                               placeholder='Vui lòng Họ tên'
                               className='w-70 mt-4'
                               name='name'
                               onChange={(e)=>setOrder((preState => ({...preState,name:e.target.value}))) }
                               ></CssTextField>
                          <CssTextField
                              id="custom-css-outlined-input"
                               type='text'
                               label='Ghi chú '
                               placeholder='VD: thêm tương cà, tương ớt'
                               className='w-70 mt-4'
                               color='warning'
                               rows={6}
                               multiline
                               name='note'
                               onChange={(e)=>setOrder((preState => ({...preState,note:e.target.value}))) }
                               ></CssTextField>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={6} className='p-2'>
                          <Payment parentCallback={callbackFunctionPayment} ></Payment>
                          <Typography align='center' className='text-xl mt-4 font-mono'>Tiền hàng : <b className='text-red-500'>{total} đ</b></Typography>
                          <Typography align='center' className='text-xl mb-2 font-mono'>Tiền ship : <b className='text-red-500'>{ship} đ</b></Typography>
                          <Divider/>
                          <Typography align='center' className='text-xl mt-2 mb-6 font-mono'>Tổng tiền : <b className='text-red-500'>{total+ship} đ</b></Typography>
                         {payment === false 
                         ?(
                          <>
                          <Button className='bg-yellow-500 hover:bg-yellow-400 text-slate-50 h-14' 
                          sx={{display:'block',margin:"auto",width:"80%"}}
                          onClick={handleOrder}
                           >Đặt hàng</Button>
                           <Typography align='center' className='mt-2 text-sm'>(Vui lòng xác thực số điện thoại trước khi đặt hàng)</Typography>
                           </>
                         )
                          :(
                            <PayPalButton
                            
                            options={{
                              clientId: process.env.REACT_APP_PAYPAL,
                              currency: "USD",
                            }}
                            amount={total+ship}
                            // onSuccess={(details, data) => {
                            //   alert("Transaction completed by " + details.payer.name.given_name);
                            //   console.log({ details, data });
                            // }}
                            onSuccess={handleOrder}
                          />
                           )}
                        </Grid>
                </Grid>       
                {orderStatus === true ?(<AlertDialog  parentCallback={callbackFuntionDialog}></AlertDialog>):null}       
        </Container>    
        )
}
export default Cart