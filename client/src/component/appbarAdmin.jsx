import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Button from '@mui/material/Button';
import { Container, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';
import { styled} from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import Badge from '@mui/material/Badge';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Stack } from '@mui/system';
import { io } from "socket.io-client";
import { addNotify } from '../redux/notify/notifySlice';
import { useDispatch } from 'react-redux';

const drawerWidth = 220;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const AppbarAdmin = () => {
    const socketAdmin = io(process.env.REACT_APP_SERVER ) 
    const dispatch = useDispatch()

    const notify = useSelector(state => state.notify.notify);

    const [open, setOpen] = React.useState(false);
    const [openNotify, setOpenNotify] = React.useState(false);
    const [size, setSize] = React.useState(0);

    React.useEffect(()=>{
      socketAdmin.on("getNotification", (dataOrder) => { 
        dispatch(addNotify(dataOrder))
   }) 
    },[])


    const handleClick = () =>{
      if(openNotify ===false){
        setOpenNotify(true)
      }else{
        setOpenNotify(false)
      }
    }

    React.useEffect(()=>{
      if(window.innerWidth >= 1024){
        setSize(13)
      }else{
        setSize(2)
      }
    },[])

  return (
    <Box sx={{ flexGrow: 1 }}>      
      <AppBar position="fixed"  className='bg-red-800 p-4'>
      <Container>
        <Toolbar >
           <Stack direction='row' spacing={size}
            justifyContent="center"
            alignItems="center">
          <Link to='/'>
           <img src={require('../assets/icon.png')} alt="" className='mx-auto w-56'></img>
           </Link>
        <Link to='/admin'>
          <Button  sx={{ display: { xs: 'none', md: 'block' } }}
           className="text-slate-50 hover:text-yellow-400 text-lg font-semibold">
            TRANG CHỦ
          </Button>
        </Link>
        <Link to='/admin/order'>
          <Button  sx={{ display: { xs: 'none', md: 'block' } }}
           className="text-slate-50 hover:text-yellow-400 text-lg font-semibold">
            <LibraryBooksIcon></LibraryBooksIcon>&emsp;Danh sách đơn hàng
          </Button>
        </Link>
          <Button  sx={{ display: { xs: 'none', md: 'block' } }}
           className="text-slate-50 hover:text-yellow-400 text-lg font-semibold"
           onClick={handleClick}>
             <Badge badgeContent={notify.length} color="warning">
             <NotificationsIcon></NotificationsIcon>
              </Badge>&emsp;Thông báo
          </Button>
          {openNotify === true 
          ?(
          <Box className='absolute top-20 right-0 p-4 border-4 border-double border-neutral-500 bg-slate-50'>
             {notify.map((notice,index) =>(
              <Link to={`/admin/order/${notice.id}`} key={index}>
               <Stack  className="my-4">
                  <Typography className='text-neutral-900 hover:text-yellow-500 text-md'>Đơn hàng mới : {notice.id}</Typography>
                  <Typography className='text-sky-700 text-sm'>{new Date(notice.time).toLocaleString()}</Typography>
                  <Divider/>
               </Stack>
              </Link>
            
             ))}
          </Box>
            )
          :null}

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{display: { xs: 'block', md: 'none' } }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            </Stack>
        </Toolbar>
        </Container>
      </AppBar>
                    <Drawer
                        sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                        },
                        }}
                        variant="persistent"
                        anchor="right"
                        open={open}
                    >
                        <DrawerHeader className='bg-red-800 pb-12'>
                                <IconButton onClick={() => setOpen(false)} className="text-slate-50 font-semibold">
                                <CloseIcon />&emsp; Close   
                        </IconButton>
                        </DrawerHeader>
                      <List>
                      <ListItem disablePadding className='py-4' >
                          <Link to='/admin'>
                                <ListItemButton className="text-neutral-600 hover:text-red-600">
                                <HomeIcon ></HomeIcon>&emsp; 
                                <Typography className=" text-md font-semibold">TRANG CHỦ</Typography>
                                </ListItemButton>
                          </Link>
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding className='py-4' >
                          <Link to='/admin/order'>
                                <ListItemButton className="text-neutral-600 hover:text-red-600">
                                <LibraryBooksIcon ></LibraryBooksIcon>&emsp; 
                                <Typography className=" text-md font-semibold">DANH SÁCH HÓA ĐƠN</Typography>
                                </ListItemButton>
                          </Link>
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding className='py-4' >
                          <Link to='/admin'>
                                <ListItemButton className="text-neutral-600 hover:text-red-600">
                                <NotificationsIcon ></NotificationsIcon>&emsp; 
                                <Typography  className=" text-md font-semibold">Thông báo</Typography>
                                </ListItemButton>
                          </Link>
                        </ListItem>
                        <Divider />
                      
                        </List>
                    </Drawer>
    </Box>
  );
}
export default AppbarAdmin