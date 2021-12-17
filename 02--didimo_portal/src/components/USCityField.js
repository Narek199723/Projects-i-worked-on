// Thanks to https://material-ui.com/components/autocomplete/ for creating exactly the component I needed!

import React from "react";
import TextField from "@material-ui/core/TextField";
/*import Autocomplete from "@material-ui/lab/Autocomplete";*/
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from "@material-ui/styles";
import STATES_AND_CITIES from "../helpers/USStatesAndCities";

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

export default function USCityField(props) {
  const classes = useStyles(),
    { onChange, fullWidth } = props,
    cities = STATES_AND_CITIES[props.countryState]
      ? STATES_AND_CITIES[props.countryState]["cities"]
      : [];
  const cityCode =
    cities && cities.length > 0
      ? cities.find((city) => city.code === props.value) || {
          code: "",
          label: "",
        }
      : "";
  return (
    (cities && cities.length > 0 && (
      <Autocomplete
        id="city-select"
        options={cities}
        fullWidth={fullWidth}
        className={[classes.option, classes.select].join(" ")}
        disabled={props.disabled}
        onChange={onChange}
        autoHighlight
        getOptionLabel={(option) => option.label}
        renderOption={(option) => (
          <React.Fragment>{option.label}</React.Fragment>
        )}
        value={cityCode}
        renderInput={(params) => (
          <TextField
            {...params}
            label="City"
            variant="outlined"
            fullWidth
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
    )) || (
      <TextField
        fullWidth={fullWidth}
        placeholder=""
        className={[classes.option, classes.select].join(" ")}
        disabled={props.disabled}
        label="City"
        variant="outlined"
        value={props.value}
        onChange={(e) => onChange(e, { code: e.target.value })}
        inputProps={{
          "aria-label": "city",
          "data-id": "city",
        }}
      />
    )
  );
}
