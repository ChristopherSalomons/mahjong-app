import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLayout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import HowToPlayPage from "./pages/HowToPlayPage.js";
import YakuPage from "./pages/YakuPage.js";
import StrategyPage from "./pages/StrategyPage.js";
import MissingPage from "./pages/MissingPage.js";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="howtoplay" element={<HowToPlayPage />} />
          <Route path="yaku" element={<YakuPage />} />
          <Route path="strategy" element={<StrategyPage />} />
          <Route path="*" element={<MissingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
