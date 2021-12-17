import React, { useContext } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { GlobalContext } from '../context/store.js';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const CountrySelect = (props) => {
  const { state } = useContext(GlobalContext);
  const { setCountry } = props;
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const [countryList, setcountryList] = React.useState([]);
  const [countryCode, setcountryCode] = React.useState(0);

  let selectedCountryCode = props.value;

  React.useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    (async () => {
      await sleep(1e3);
      if (active) {
        setOptions([...countryList]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  React.useEffect(() => {
    if (props.accessToken) {
      try {
        axios.get('geo/countries', {
          headers: { Authorization: `Bearer ${props.accessToken}` }
        }).then((res) => {
          setcountryList(res.data);
          setcountryCode(res.data?.find((country) => country.iso_code2 === selectedCountryCode) || { __type: "", iso_code2: "", name: "" });
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, [props.countryCode]);


  return (
    <Autocomplete
      id='user-setting-country-auto-complete'
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name + ` (${option.iso_code2})`}
      options={options}
      loading={loading}
      value={countryCode}
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={(e) => setCountry(e.target.value)}
          fullWidth
          label="Country"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default CountrySelect;
