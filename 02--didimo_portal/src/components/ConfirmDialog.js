import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';

export default function ConfirmDialog(props) {
  const {
    title,
    message,
    open,
    onContinue,
    continueEnabled,
    onCancel,
    onClose,
  } = props;
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        {props.children}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onContinue}
          disabled={continueEnabled === false}
          color="primary"
        >
          Yes
        </Button>
        <Button onClick={onCancel} color="primary">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
