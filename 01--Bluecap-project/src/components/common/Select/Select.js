import { Fragment, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import classes from "./Select.module.css";

const SelectField = ({ days, selectHandler, defaultData }) => {
  const [date, setDate] = useState("");
  const [gettingDaysInMonth, setGettingDaysInMonth] = useState(null);
  const [gettingThreeMonthsDays, setGettingThreeMonthsDays] = useState(null);

  const handleChange = (event) => {
    setDate(event.target.value);
    selectHandler(event.target.value);
  };

  // This useEffect is going to calculate the days in the month
  useEffect(() => {
    const now = Date.now();
    const dt = new Date(now);
    const month = dt.getMonth();
    const year = dt.getFullYear();
    const daysInMonth = new Date(year, month, 0).getDate();
    setGettingDaysInMonth(daysInMonth + 1);
  }, []);

  // THis useEffect is going to calculate the days in 3 months
  useEffect(() => {
    const now = Date.now();
    const dt = new Date(now);
    const year = dt.getFullYear();
    const thisMonth = new Date(year, dt.getMonth() + 1, 0).getDate();
    const secondMonth = new Date(year, dt.getMonth(), 0).getDate();
    const thirdMonth = new Date(year, dt.getMonth() - 1, 0).getDate();
    setGettingThreeMonthsDays(thisMonth + secondMonth + thirdMonth);
  }, []);

  return (
    <Box sx={{ minWidth: 140 }}>
      <div className={classes.selectContainer}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" shrink={false}>
            {!date && defaultData}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={date}
            label=""
            onChange={handleChange}
          >
            <MenuItem value={7}>Last 7 days</MenuItem>
            <MenuItem value={gettingDaysInMonth}>Last month</MenuItem>
            <MenuItem value={gettingThreeMonthsDays}>Last 3 months</MenuItem>
          </Select>
        </FormControl>
      </div>
    </Box>
  );
};
export default SelectField;
