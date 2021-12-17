import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow: "inset 0 0 0 2px #7DA8FB",
    backgroundColor: "#fff",
    backgroundImage: "#7DA8FB",
    "$root.Mui-focusVisible &": {
      outline: "2px auto #7DA8FB",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#B345D2",
      boxShadow: "inset 0 0 0 4px #fff",
    },
  },
  checkedIcon: {
    backgroundColor: "#B345D2",
    backgroundImage: "#fff",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "#fff",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#B345D2",
      boxShadow: "inset 0 0 0 4px #fff",
    },
  },
  iconBox: {
    backgroundColor: "#B345D2",
  },
});

// Inspired by blueprintjs
function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default function CustomizedRadios({ changeListener }) {
  console.log(changeListener, "changeListener");
  const [value, setValue] = useState({ selected: "Join all meetings" });
  const handleChange = (event) => {
    console.log(event.target);
    setValue(event.target.value);
    changeListener(event.target.value);
  };

  return (
    <FormControl component="fieldset" fullWidth>
      <RadioGroup
        aria-label="meeting-setting"
        name="meeting-setting"
        onChange={handleChange}
        value={value}
      >
        <FormControlLabel
          value="ALL"
          control={<StyledRadio />}
          label="Join all meetings"
          className="meeting-settings radio-label"
        />
        <FormControlLabel
          value="OWNED"
          control={<StyledRadio />}
          label="Join meetings I own"
          className="meeting-settings radio-label"
        />
        <FormControlLabel
          value="ON_DEMAND"
          control={<StyledRadio />}
          label="On demand"
          className="meeting-settings radio-label"
        />
      </RadioGroup>
    </FormControl>
  );
}
