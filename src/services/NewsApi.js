import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiHeaders = {
  "x-bingapis-sdk": "true",
  "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
  "x-rapidapi-key": "6e9f3a77bemshf6582ee86a82591p1cdeffjsnbb652cffa87b",
};

const url = "https://bing-news-search1.p.rapidapi.com";
const createRequest = (url) => ({ url, headers: apiHeaders });

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
