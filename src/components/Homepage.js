import React from "react";
import millify from "millify";
import { Typography} from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/Api";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  if (isFetching) return "loading..";
  return (
    <>
      <h2 className="text-xl font-bold uppercase">Global Crypto Status</h2>
      <div className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-2 xl:grid-cols-4 xl:gap-4 mt-4 mb-10">
        <div className="text-center bg-gray-100 p-5 shadow-md mt-2">
          <span className="block text-lg font-bold">
            Total Cryptocurrencies
          </span>
          <small className="block text-sm">{globalStats.total}</small>
        </div>
        <div className="text-center bg-gray-100 p-5 shadow-md mt-2">
          <span className="block text-lg font-bold">Total Exchanges</span>
          <small className="block text-sm">
            {millify(globalStats.totalExchanges)}
          </small>
        </div>
        <div className="text-center bg-gray-100 p-5 shadow-md mt-2">
          <span className="block text-lg font-bold">Total Market Cap</span>
          <small className="block text-sm">
            {millify(globalStats.totalMarketCap)}
          </small>
        </div>
        <div className="text-center bg-gray-100 p-5 shadow-md mt-2">
          <span className="block text-lg font-bold">Total Markets</span>
          <small className="block text-sm">
            {millify(globalStats.totalMarkets)}
          </small>
        </div>
      </div>
      <div className="flex justify-between my-5">
        <h2 className="text-xl font-bold uppercase">
          Top 10 Crypto Currencies in the world
        </h2>
        <Link to="/cryptocurrencies" className="uppercase text-black">Show More</Link>
      </div>
      <Cryptocurrencies simplified />
      <div className="flex justify-between my-5">
        <h2 className="text-xl font-bold uppercase">
          Top 10 Crypto Currencies in the world
        </h2>
        <Link to="/news" className="uppercase text-black">Show More</Link>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
