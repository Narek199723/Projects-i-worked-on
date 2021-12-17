import React, { Fragment, useEffect, useState } from "react";
import classes from "./SentimentChart.module.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Card } from "@material-ui/core";
import SelectFIeld from "../common/Select/Select";
import { Box } from "@material-ui/system";
import { Post } from "../../utils/axiosUtils";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);
const options = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: 60,
  cutoutPercentage: 30,
  legend: {
    display: true,
    position: "bottom",
    labels: {
      boxWidth: 9,
      fontColor: "#474747",
      fontFamily: "6px Montserrat",
    },
  },
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    position: "top",
  },

  plugins: {
    legend: {
      position: "right",
      labels: {
        boxWidth: 6,
        borderRadius: 9,
        usePointStyle: true,
        fontColor: "#474747",
        fontSize: "24px",
        fontFamily: "16Montserrat",
        font: {
          size: 18,
        },
      },
    },
    datalabels: {
      display: false,
    },
  },
};

const SentimentChart = () => {
  const oneWeekTimeStamp = Date.now() - 7 * 86400000;
  const [fetchedData, setFetchedData] = useState({});

  const [timeStamp, setTimeStamp] = useState({
    start: oneWeekTimeStamp,
    end: Date.now(),
  });

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
        // const { data } = await Post(`analytics/getSentiment`, timeStamp);
        console.log(data.data, "Data IN SENTIMENTCHART");
        setFetchedData(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [timeStamp]);

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

  const reduceFunction = (arr) => arr.reduce((acc, cur) => acc + cur, 0);

  const veryPositiveNumber = reduceFunction([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const positiveNumber = reduceFunction([11, 12, 13, 14, 15, 16, 17]);
  const negativeNumber = reduceFunction([18, 0, 20, 1, 15, 4, 17]);
  const veryNegativeNumber = reduceFunction([1, 12, 3, 14, 1, 16, 1]);

  const data = {
    labels: [
      `😀  (${veryPositiveNumber})`,
      `🙂  (${positiveNumber})`,
      `🙁  (${negativeNumber})`,
      `😖  (${veryNegativeNumber})`,
    ],

    datasets: [
      {
        label: "# of Votes",
        //  here it should be a dynamic value

        data: [
          veryPositiveNumber,
          positiveNumber,
          negativeNumber,
          veryNegativeNumber,
        ],
        backgroundColor: ["#ef5da8", "#dea901", "#b443db", "#2c74fe"],
        borderColor: ["#ef5da8", "#dea901", "#b443db", "#2c74fe"],
        borderWidth: 1,
      },
    ],
  };

  const plugins = [
    {
      beforeDraw: function (chart) {
        const width = chart.width;
        const height = chart.height;
        const ctx = chart.ctx;
        ctx.restore();
        const fontSize = (height / 140).toFixed(2);
        ctx.textAlign = "center";
        ctx.font = fontSize + "em sans-serif";
        ctx.fillStyle = "#474747";
        ctx.textBaseline = "center";

        const text =
          veryPositiveNumber +
          positiveNumber +
          negativeNumber +
          veryNegativeNumber;
        const textX = Math.round((width - chart.legend.width) / 2);
        const textY = height / 1.9;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
    {
      beforeDraw: function (chart) {
        const width = chart.width;
        const height = chart.height;
        const ctx = chart.ctx;
        ctx.restore();
        const fontSize = (height / 260).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "center";
        const text = `Total`;
        const textX = Math.round((width - chart.legend.width) / 2);
        const textY = height / 1.7;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "5% 5% 0 5%",
          }}
        >
          <h4 style={{ fontSize: "16px", padding: "2%" }}>
            Contacts by sentiment
          </h4>
          <SelectFIeld
            days
            selectHandler={selectChangeHandler}
            defaultData="Last 7 days"
          />
        </Box>

        <div className={classes.doughnut}>
          <Doughnut
            data={data}
            height={250}
            type="doughnut"
            plugins={plugins}
            options={options}
          />
        </div>
      </Box>
    </Fragment>
  );
};

export default SentimentChart;
