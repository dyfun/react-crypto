import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import LineChart from "./LineChart";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/Api";

const Cryptodetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });
  console.log(coinHistory);
  const cryptoDetails = data?.data?.coin;
  if (isFetching) return "Loading..";

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails?.["24hVolume"] && millify(cryptoDetails?.["24hVolume"])
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];
  return (
    <div>
      <h2 className="text-xl font-bold uppercase">
        {cryptoDetails.name} ({cryptoDetails.symbol}) Price
      </h2>
      <p>
        {cryptoDetails.name} live price in US dollars. View value statistics,
        market cap and supply.
      </p>
      <div className="w-full mt-2 mb-8 flex item-center">
        <span className="p-2 w-1/12 uppercase">Select Time: </span>
        <select
          onChange={(e) => setTimePeriod(e.target.value)}
          className="border-2 p-2 w-11/12"
        >
          {time.map((date) => (
            <option key={date}>{date}</option>
          ))}
        </select>
      </div>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />
      <div className="mt-4">
        <h3 className="text-xl font-bold uppercase">
          {cryptoDetails.name} value statistics
        </h3>
        <p>An overview showing the stats of {cryptoDetails.name}</p>
        <div className="grid grid-cols-2 gap-2">
          {stats.map(({ icon, title, value }) => (
            <div className="shadow-sm bg-gray-100 p-4">
              <div className="flex item-center">
                <span className="mr-2">{icon}</span>
                <span>{title}</span>
              </div>
              <small className="text-sm">{value}</small>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold uppercase">Other statistics</h3>
        <p>An overview showing the stats of {cryptoDetails.name}</p>
        <div className="grid grid-cols-2 gap-2">
          {genericStats.map(({ icon, title, value }) => (
            <div className="shadow-sm bg-gray-100 p-4">
              <div className="flex">
                <span className="mr-2">{icon}</span>
                <span>{title}</span>
              </div>
              <small className="text-sm">{value}</small>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold uppercase">
          What is {cryptoDetails.name}
        </h3>
        <p>{HTMLReactParser(cryptoDetails.description)}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold uppercase">{cryptoDetails.name}</h3>
        {cryptoDetails.links.map((link) => (
          <div className="bg-gray-100 p-4 my-3" key={link.name}>
            <h5 className="text-sm font-bold uppercase">{link.type}</h5>
            <a href={link.url} target="_blank">
              {link.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cryptodetails;
