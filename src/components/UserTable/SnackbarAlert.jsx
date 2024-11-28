import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const SnackbarAlert = ({ open, message, onClose, severity }) => (
  <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
    <MuiAlert elevation={6} variant="filled" severity={severity} onClose={onClose}>
      {message}
    </MuiAlert>
  </Snackbar>
);

export default SnackbarAlert;
