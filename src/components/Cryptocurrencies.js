import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/Api";
const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchItem] = useState("");

  useEffect(() => {
    const filterData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    setCryptos(filterData);
  }, [cryptoList, searchTerm]);

  if (isFetching) return "loading...";
  return (
    <>
      {!simplified && (
        <div className="w-full">
          <input
            type="text"
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchItem(e.target.value)}
            className="border-2 p-2 w-full"
          />
        </div>
      )}
      <div className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-2 xl:grid-cols-4 xl:gap-4 mt-4">
        {cryptos?.map((currency) => (
          <div key={currency.uuid} className="mt-4">
            <Link to={`/crypto/${currency.uuid}`}>
              <div className="bg-white shadow-md h-70 min-h-full hover:shadow-lg">
                <div className="flex justify-between items-center border-b border-gray-200 p-4">
                  <h3 className="text-sm uppercase">
                    {`${currency.rank} . ${currency.name}`}
                  </h3>
                  <img src={currency.iconUrl} height="30" width="40" />
                </div>
                <div className="p-5 text-black">
                  <p>Price: {millify(currency.price)}</p>
                  <p>Market Cap: {millify(currency.marketCap)}</p>
                  <p>Daily Change: {millify(currency.change)}%</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cryptocurrencies;
