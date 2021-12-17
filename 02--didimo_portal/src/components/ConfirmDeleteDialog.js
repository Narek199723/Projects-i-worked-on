import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useEffect } from "react";
import ConfirmDialog from "./ConfirmDialog";
import { Typography } from "@material-ui/core";
import "../pages/Profile/Settings.css"

export default function ConfirmDeleteDialog(props) {
  const { title, message, open, onContinue, onCancel, onClose } = props,
    [code, setCode] = useState(""),
    [currentCode, setCurrentCode] = useState("");

  const refreshCode = () => {
    setCurrentCode((Math.trunc(Math.random() * 10000) + "").padEnd(4, "0"));
    setCode("");
  };

  useEffect(() => {
    refreshCode();
  }, []);

  const close = () => {
    refreshCode();
    onClose();
  };

  return (
    <ConfirmDialog
      open={open}
      title={title}
      message={<Typography style={{ color: "red" }}>{message}</Typography>}
      continueEnabled={code !== "" && code === currentCode}
      onClose={close}
      onContinue={(item) => {
        onContinue(item);
        close();
      }}
      onCancel={() => {
        onCancel();
        close();
      }}
    >
      <TextField
        className="delete_input"
        autoFocus
        margin="dense"
        id="name"
        label={`Please insert the following code: ${currentCode}`}
        type="text"
        value={code}
        onChange={(e) => {
          setCode(e.currentTarget.value);
        }}
        fullWidth
      />
    </ConfirmDialog>
  );
}
