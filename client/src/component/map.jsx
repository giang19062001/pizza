import {
    useJsApiLoader,//gọi api map
    GoogleMap, //bản đồ
    MarkerF, //icon định vị
    Autocomplete,//hiện các mẫu vị trí khi nhập 
    DirectionsRenderer,//vẽ đường đi 
  } from '@react-google-maps/api';
  import { useRef, useState } from 'react';
import { Box, Typography,TextField, Container, Stack} from '@mui/material';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';


const center = { lat:10.739131260718063, lng: 106.67413869714314 } 

const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: 50,
      borderColor:"blue"
    },
  },
});

const Map = (props) =>{

    const [ libraries ] = useState(['places'])
    const [load,setLoad] = useState(false)
    const [size,setSize] = useState({
      width:0,
      height:0
    });
 
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries
    })
    
    useEffect(()=>{
      if (!isLoaded) {
        console.log('connect api map fail')
      }else{
        setLoad(true)
      }
      if(window.innerWidth >= 1024){
        setSize(()=>({width:1100,height:500}))
      }else{
        setSize(()=>({width:300,height:300}))
      }
    
    },[isLoaded])
      
    const [map, setMap] = useState((null))
  
    const [directionsResponse, setDirectionsResponse] = useState(null) // đương vẽ đi từ a - b
    const [distance, setDistance] = useState('0 km') // khoang cach
    const [duration, setDuration] = useState('0 hour') //thoi gian di
  
    const destiantionRef = useRef()

    const calculateRoute = async () => {
        try {
          if (destiantionRef.current.value === '') {
            return null
          }else{
          // eslint-disable-next-line no-undef
          const directionsService = new google.maps.DirectionsService()
          const results = await directionsService.route({
            origin: '356 Tạ Quang Bửu, District 8, Ho Chi Minh City, Vietnam',
            destination: destiantionRef.current.value,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
            //DRIVING ,BYCLCLING , WALKING , TRANSIT : dạng di chuyển  khi rendera
          })
      
          setDirectionsResponse(results)
          setDistance(results.routes[0].legs[0].distance.text) //lấy khoảng cách ra
          setDuration(results.routes[0].legs[0].duration.text) //lấy thời gian di ra
          props.parentCallback(results.routes[0].legs[0].distance.text,destiantionRef.current.value); // truyền prop từ con sang cha
        }
        } catch (error) {
           console.log("không thể tìm thấy tuyến đường nào giữa điểm xuất phát và điểm đến")
        }
      }

    return (
      <>
        {load === true ?(
          <>
            <Container className='z-10 mb-6' >
              <Stack spacing={2} className='text-neutral-700'>
                  <Autocomplete>
                    <CssTextField
                      type='text'
                      label='Địa chỉ giao hàng'
                      placeholder='Vui lòng nhập địa chỉ giao hàng'
                      fullWidth
                      inputRef={destiantionRef}
                      onBlur={calculateRoute}
                      id="custom-css-outlined-input"
                    />
                  </Autocomplete>   
                <Box className='flex sm:flex-row flex-col justify-around mt-6' spacing={2} >
                <Typography>Chêch lệch khoảng cách : {distance} </Typography> 
                {/* khoảng cách */}
                <Typography>Thời gian giao hàng : {duration} </Typography>
                {/* thời gian di */}
              </Box>
              </Stack>
            </Container>
            <Box  className='' sx={{width:size.width,height:size.height}}>
              {/* Google Map Box */}
              <GoogleMap
                center={center} // sẽ tới vị trí này đầu tiên khi load page
                zoom={15}
                mapContainerStyle={{ width: '100%', height: '100%' }}
                options={{
                  zoomControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                }}
                onLoad={map => setMap(map)}
              >
                <MarkerF position={center} /> 
                {/* dấu định vị đỏ */}
                {directionsResponse && (
                  <DirectionsRenderer directions={directionsResponse} />
                )}
                {/* nếu có nhập và tính toán ra  đường di thì render ra đường đi*/}
              </GoogleMap>
            </Box>
        </>)
        :null}
      </>
    )
}
export default Map