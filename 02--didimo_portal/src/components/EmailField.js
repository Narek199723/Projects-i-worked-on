import React from "react";
import TextField from "@material-ui/core/TextField";


export default function EmailField(props) {
  const { label, inputProps, value, classes, ...restProps } = props
   
  return (
    <TextField
      {...restProps}
      placeholder=""
      label={label}
      variant="outlined"
      value={value}
     
      inputProps={inputProps}
    />
  );
}
