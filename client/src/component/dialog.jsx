import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {

  const handleClose = () => {
    props.parentCallback(false)
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Đặt hàng thành công"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Qúy khách đã đặt hàng thành công vui lòng giữ máy để nhân viên giao bánh có thể liêc lạc khi đến nơi.
            <img src={require('../assets/giao-hàng-1.gif')}  alt=''/>
          </DialogContentText>
        </DialogContent>

      </Dialog>
    </div>
  );
}
