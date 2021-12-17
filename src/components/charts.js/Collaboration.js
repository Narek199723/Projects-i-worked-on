import React, { Fragment, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";
import { Card, Box } from "@material-ui/core";
import SelectFIeld from "../common/Select/Select";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Post } from "../../utils/axiosUtils";
import axios from "axios";

const hostParticipantStyle = {
  backgroundColor: "rgba(53, 162, 235, 0.2)",
  color: "rgba(53, 162, 235, 1)",
  padding: "2px 16px",
  borderRadius: "6px",
};

ChartJS.register(
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  layout: {
    padding: {
      left: 10,
      right: 40,
    },
  },
  scales: {
    x: {
      grid: {
        drawOnChartArea: false,
        drawBorder: false,
        zeroLineColor: "transparent",
        display: false,
      },
      borderRadius: 5,
      stacked: true,
      barPercentage: 1.0,
      categoryPercentage: 1.0,
      ticks: {
        display: false,
      },
    },
    y: {
      grid: {
        drawOnChartArea: false,
        drawBorder: false,
        zeroLineColor: "transparent",
        display: false,
      },
      stacked: true,
      barPercentage: 0.7,
      borderRadius: 5,
      categoryPercentage: 1.0,
      ticks: {
        crossAlign: "far",
      },
    },
  },
  indexAxis: "y",
  responsive: true,
  plugins: {
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
    legend: {
      position: "bottom",
      labels: {
        boxWidth: 6,
        borderRadius: 9,
        usePointStyle: true,
        fontColor: "#474747",
        fontFamily: "6px Montserrat",
      },
    },
    datalabels: {
      align: "end",
      clamp: true,
      anchor: "end",
      fontWeight: "600",
      font: {
        weight: "800",
        size: 12,
        family: "Josefin Sans",
      },
      // backgroundColor: function (context) {
      //   return context.dataset.backgroundColor;
      // },
      formatter: function (value, context) {
        if (context.dataset.label === "Group") {
          return value + ` hr`;
        }
        return "";
      },
    },
  },
};

const Collaboration = (props) => {
  const startingFromLastMonth = Date.now() - 7 * 86400000;
  const [fetchedData, setFetchedData] = useState({});
  const [currentMonth, setCurrentMonth] = useState(null);

  const [timeStamp, setTimeStamp] = useState({
    start: startingFromLastMonth,
    end: Date.now(),
  });

  const selectChangeHandler = (e) => {
    const end = Date.now();
    const oneDay = 86400000;
    const dayMultipliedByValue = +e * oneDay;
    const start = end - dayMultipliedByValue;
    setTimeStamp({
      start,
      end,
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_BASE_API_URL}/analytics/getSentiment`,
          timeStamp,
          {
            headers: {
              Authorization: `Bearer MbHi8765Slk`,
            },
          }
        );
        console.log(data.data, "COLABORATION DATA ");
        // const { data } = await Post(`analytics/getSentiment`, timeStamp);
        setFetchedData(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [timeStamp]);

  const labels = [
    "Nov 1 - 7",
    "Nov 8 - 14",
    "Nov 15 - 21",
    "Nov 22 - 28",
    "Nov 29 - Dec 5",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "One to one",
        display: false,
        data: [1],
        backgroundColor: "rgba(53, 162, 235, 0.9)",
        barPercentage: 1,
        borderRadius: 5,
        stack: false,
        barThickness: 12,
        datalabels: {
          anchor: "end",
        },
      },
      {
        label: "Group",
        stack: false,

        display: false,
        data:
          fetchedData?.meetingParticipationAsHost?.length > 0
            ? fetchedData.meetingParticipationAsAll
            : [20, 40, 35, 45, 40],
        borderRadius: 5,
        backgroundColor: "rgba(53, 162, 235, 0.4)",
        barPercentage: 0.5,
        borderRadiusOnAllStackedSeries: true,
        barThickness: 12,
      },
    ],
  };

  useEffect(() => {
    const options = {
      month: "long",
    };
    const now = new Date();
    const month = new Intl.DateTimeFormat(navigator.language, options).format(
      now
    );
    setCurrentMonth(month);
  }, []);

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "5% 5% 2% 5%",
        }}
      >
        <h4 style={{ padding: "2%" }}>Collaboration</h4>

        <SelectFIeld
          width={180}
          selectHandler={selectChangeHandler}
          defaultData="Last 7 Days"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: "1% 3%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
          }}
        >
          <p
            style={{
              fontSize: "14px",
            }}
          >
            Daily average
          </p>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h5>Host</h5>
          <span style={hostParticipantStyle}>1h 10m</span>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h5>Participant</h5>
          <span style={hostParticipantStyle}>2h 32m</span>
        </Box>
      </Box>
      <div
        style={{
          width: "95%",
          margin: "0 auto",
        }}
      >
        <Bar options={options} data={data} />
      </div>
    </Fragment>
  );
};
export default Collaboration;
