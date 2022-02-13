import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(coinHistory?.data?.history[i]?.price);
    coinTimestamp
      .push(new Date(coinHistory?.data?.history[i]?.timestamp * 1000).toLocaleDateString())
      .toLocaleString();
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <div className="block">
        <h2 className="text-xl font-bold uppercase">
          {coinName} Price Chart
        </h2>
        <div className="flex">
          <small className="text-xs font-bold uppercase">
            rate of change: {coinHistory?.data?.change}%
          </small>
          <small className="ml-2 text-xs font-bold uppercase">
            Current {coinName} Price: ${currentPrice}
          </small>
        </div>
      </div>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
