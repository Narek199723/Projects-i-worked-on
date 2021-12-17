import React, { Fragment, useEffect, useReducer, useState } from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Box } from "@material-ui/core";
import SelectFIeld from "../common/Select/Select";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const labelData = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const weekDays = [];

function day() {
  const day = new Date();
  for (let i = 0; i < 7; i++) {
    weekDays.push(labelData[(day.getDay() - 1 + i) % 7]);
  }
}

day();

const WEEK = "WEEK";
const MONTH = "MONTH";
const THREEMONTH = "THREEMONTH";

const initialState = {
  weekDays,
  value: {
    start: Date.now() - 7 * 86400000,
    end: Date.now(),
  },
};

const selectReducer = (state, action) => {
  const { type, payload } = action;
  if (type === WEEK) {
    return initialState;
  }
  if (type === MONTH) {
    return {
      labelData: payload,
    };
  }
  if (type === THREEMONTH) {
    return {};
  }
};

const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Meetings",
    },
    legend: {
      labels: {
        boxWidth: 8,
        font: {
          size: 14,
        },
        usePointStyle: true,
        fontColor: "#474747",
        fontFamily: "6px Montserrat",
      },
    },
    datalabels: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
        drawOnChartArea: false,
      },
    },
    y: {
      grid: {
        id: "y-axis-gravity",
        drawOnChartArea: false,
        drawBorder: false,
        display: false,
      },
      ticks: {
        display: false,
      },
    },
    y1: {
      drawBorder: false,
      drawOnChartArea: false,
      type: "linear",
      display: false,
      position: "right",
    },
  },
};
console.log("I AM WORKING OUTSIDE THE COMPONENT");
const MeetingChart = ({ children }) => {
  const [meetingsData, dispatchMeetingsData] = useReducer(
    selectReducer,
    initialState
  );

  const now = Date.now();
  const dt = new Date(now);
  const year = dt.getFullYear();
  const thirdMonth = new Date(year, dt.getMonth() - 1, 0).getDate();

  const [fetchedData, setFetchedData] = useState({});

  const data = {
    labels: weekDays,
    datasets: [
      {
        label: "All meetings",
        // In the final Version this should be fetchedData.meetingAsAll
        data: fetchedData?.meetingAsAll,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 1)",
        yAxisID: "y",
        tension: 0.7,
      },
      {
        label: "Meetings i missed",
        // In the final Version this should be fetchedData.absentMeetings
        data: fetchedData?.absentMeetings,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 1)",
        yAxisID: "y1",
        tension: 0.7,
      },
    ],
  };

  const calculateTimeStamp = (days = 2) => {
    const end = Date.now();
    const daysInfo = Date.now(Date.now() - 1000 * 60 * 60 * 24);
    console.log(daysInfo, "DAYSINFO", new Date(daysInfo));
  };
  calculateTimeStamp();
  const getData = async (data) => {
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/analytics/getUserMeetings`,
        data,
        {
          headers: {
            Authorization: `Bearer MbHi8765Slk`,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // const data = await Promise.all([
  //     getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
  //     getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
  //     getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
  // ]);

  useEffect(() => {
    (async () => {
      try {
        const data = Promise.all([getData()]);
        setFetchedData(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [meetingsData.value]);

  const selectChangeHandler = (e) => {
    const end = Date.now();
    const oneDay = 86400000;
    const dayMultipliedByValue = +e * oneDay;
    const start = end - dayMultipliedByValue;
    dispatchMeetingsData({
      type: WEEK,
      value: {
        start,
        end,
      },
    });
  };

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <Line options={options} data={data} />
        <div
          style={{
            padding: "2%",
            width: "40%",
            margin: "0 auto",
          }}
        >
          <SelectFIeld
            selectHandler={selectChangeHandler}
            days
            defaultData="Last 7 days"
          />
        </div>
      </Box>
    </Fragment>
  );
};

export default MeetingChart;
