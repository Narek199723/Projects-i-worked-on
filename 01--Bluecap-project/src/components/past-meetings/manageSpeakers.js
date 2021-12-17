import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Dialog from "@material-ui/core/Dialog";

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    fontSize: "16px",
    fontWeight: "Bold",
    textAlign: "center",
    color: "#303030",
  },
  noSpeakers: {
    fontSize: "16px",
    fontWeight: "bold",
  },
}));

export default function ManageSpeakers(open, onClose) {
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Dialog maxWidth="lg" onClose={handleClose} open={open}>
        <div style={{ padding: "20px", width: "900px" }}>
          <p className={classes.dialogTitle}>Manage speakers</p>
          <p style={{ textAlign: "center" }}>
            Edit the list of speakers, remove or add new users
          </p>
          <p className={classes.noSpeakers}>Number of speakers</p>
        </div>
      </Dialog>
    </div>
  );
}
