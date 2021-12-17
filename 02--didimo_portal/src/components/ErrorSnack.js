import React from 'react';
//import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/*const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});*/

//const onMessageClose = () => {};

export default function ErrorSnack(props) {
  // const classes = useStyles();
  return (
    <Snackbar
      onClose={props.onClose}
      open={props.open}
      autoHideDuration={6000}
      TransitionComponent={props.transition || Fade}
    >
      <Alert severity="error">{props.message}</Alert>
    </Snackbar>
  );
}
