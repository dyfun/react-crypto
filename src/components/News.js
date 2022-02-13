import React, { useState } from "react";
import moment from "moment";
import { useGetNewsQuery } from "../services/NewsApi";
import { useGetCryptosQuery } from "../services/Api";


const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Crpytocurrency");
  const { data: cryptoNews } = useGetNewsQuery({
    newsCategory,
    count: simplified ? 9 : 12,
  });
  const { data } = useGetCryptosQuery(100);
  if (!cryptoNews?.value) return "Loading...";
  return (
    <>
      {!simplified && (
        <div className="w-full mt-2 mb-8">
          <select onChange={(e) => setNewsCategory(e.target.value)} className="border-2 p-2 w-full">
            {data?.data?.coins.map((coin) => (
              <option value={coin.name}>{coin.name}</option>
            ))}
          </select>
        </div>
      )}
      <div className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-2 xl:grid-cols-4 xl:gap-4 mt-4">
        {cryptoNews.value.map((news, i) => (
          <div
            className="bg-white shadow-md h-70 min-h-full hover:shadow-lg"
            key={i}
          >
            <a href={news.url} target="_blank">
              <div className="flex justify-between items-center border-b border-gray-200 p-4">
                <h3>{news.name}</h3>
                <img
                  src={news?.image?.thumbnail?.contentUrl}
                  height="100"
                  width="100"
                />
              </div>
              <div className="p-2">
                <p className="text-black">
                  {news.description > 100
                    ? `${news.description.substring(0, 100)} ...`
                    : news.description}
                </p>
                <div className="flex justify-between items-center">
                  <img
                    src={news.provider[0]?.image?.thumbnail?.contentUrl}
                    height="30"
                    width="30"
                  />
                  <small>
                    {moment(news.dataPublished).startOf("ss").fromNow()}
                  </small>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default News;
