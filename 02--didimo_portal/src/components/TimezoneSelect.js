import React, { useContext, useEffect } from 'react';
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

const TimezoneSelect = (props) => {
  const { state } = useContext(GlobalContext);
  const { setiTmezone, accessToken } = props;
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const [timezoneList, setTimezonList] = React.useState([]);
  const [timezoneListData, setTimezoneListData] = React.useState([]);

  const [TimeZoneItem, setTimeZoneItem] = React.useState(0);
  let selectedTimeZone = props.value;

  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...timezoneList]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  React.useEffect(() => {
    if(accessToken) {
      try {
        axios.get('geo/timezones', {
          headers: { Authorization: `Bearer ${accessToken}` }
        }).then((res) => {
          ""
          let myTimeZoneItem = res.data.find(
            (country) => country.zone_id === selectedTimeZone
          ) || {
            zone_id: "Europe/Andorra",
            country_code: "AD",
            color: "grey",
          };
          if (myTimeZoneItem.country_code != undefined) {
            myTimeZoneItem.color = "blue";
          }
          setTimeZoneItem(myTimeZoneItem);
          setTimezonList(res.data);
          setTimezoneListData(
            res.data?.find((code) => code.zone_id == props.timezone)
          );
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, [props.timezone, accessToken]);

  return (
    <Autocomplete
      id='asynchronous-demo'
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.zone_id === value.zone_id}
      getOptionLabel={(option) => option.zone_id + ` (${option.country_code})`}
      options={options}
      loading={loading}
      value={TimeZoneItem}
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={(e) => setiTmezone(e.target.value)}
          fullWidth
          label='Timezone'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color='inherit' size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  );
};
export default TimezoneSelect;
