import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Button from '@mui/material/Button';
import { Container, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
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

const Appbar = () => {

    const cartList = useSelector(state => state.cart.carts);

    const [open, setOpen] = React.useState(false);
    const [size, setSize] = React.useState(0);

    React.useEffect(()=>{
      if(window.innerWidth >= 1024){
        setSize(14)
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
           <img src={require('../assets/icon.png')} alt="" className='mx-auto w-56'></img>

        <Link to='/'>
          <Button  sx={{ display: { xs: 'none', md: 'block' } }}
           className="text-slate-50 hover:text-yellow-400 text-lg font-semibold">
            TRANG CHỦ
          </Button>
        </Link>
        <Link to="/cart">
          <Button  sx={{ display: { xs: 'none', md: 'block' } }}
           className="text-slate-50 hover:text-yellow-400 text-lg font-semibold">
             <Badge badgeContent={cartList?.length} color="warning">
             <ShoppingBasketIcon></ShoppingBasketIcon>
              </Badge>&emsp;GIỎ HÀNG 
          </Button>
        </Link>
        <Link to="/" >
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Typography>Gọi điện ngay - Ship liền tay (24/7)</Typography>
          <Button
           className="text-yellow-400 text-2xl font-semibold">
             <PhoneAndroidIcon></PhoneAndroidIcon>
             &emsp;0326370882
          </Button>
          </Box>
        </Link>
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
                          <Link to='/'>
                                <ListItemButton className="text-neutral-600 hover:text-red-600">
                                <HomeIcon ></HomeIcon>&emsp; 
                                <Typography className=" text-md font-semibold">TRANG CHỦ</Typography>
                                </ListItemButton>
                          </Link>
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding className='py-4' >
                          <Link to='/cart'>
                                <ListItemButton className="text-neutral-600 hover:text-red-600">
                                <ShoppingBasketIcon ></ShoppingBasketIcon>&emsp; 
                                <Typography  className=" text-md font-semibold">GIỎ HÀNG</Typography>
                                </ListItemButton>
                          </Link>
                        </ListItem>
                        <Divider />
                      
                        </List>
                    </Drawer>
    </Box>
  );
}
export default Appbar