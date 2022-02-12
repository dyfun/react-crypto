import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/Api";
import { newsApi } from "../services/NewsApi";

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
});
