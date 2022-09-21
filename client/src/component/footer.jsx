import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import {Toolbar,Box,Grid,Container} from '@mui/material';
import Typography from '@mui/material/Typography';
import AppleIcon from '@mui/icons-material/Apple';
import { Stack } from '@mui/system';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 80,
  },
}));

export default function Footer() {
  return (
    <Box sx={{ bottom:0,position:"relative",width:"100%"}}>
      <AppBar position="static">
        <StyledToolbar className='bg-neutral-800'>
          <Container>
             <Stack className='m-6' spacing={2}>

             <Typography align='center' >Địa chỉ : 356 Tạ Quang Bửu, District 8, Ho Chi Minh City, Vietnam</Typography>

             <Typography align='center' >Để đặt bánh pizza, vui lòng liên hệ tổng đài số: 0326370882</Typography>
             <Typography align='center'>Để phản ánh chất lượng dịch vụ, vui lòng gọi số: 0326370882</Typography> 
             </Stack>           
         </Container>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}
