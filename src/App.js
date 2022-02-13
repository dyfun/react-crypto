import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import News from "./components/News";
import Homepage from "./components/Homepage";
import Cryptocurrencies from "./components/Cryptocurrencies";
import CryptoDetails from "./components/Cryptodetails";

const App = () => {
  return (
    <div className="app">
      <div className="flex flex-row">
        <div className="basis-1/5">
          <Navbar />
        </div>
        <div className="basis-4/5 p-8">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
            <Route path="/crypto/:coinId" element={<CryptoDetails />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
