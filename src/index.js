import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { AdminProvider } from "./context/AdminContext";
import { BrowserRouter } from "react-router-dom";
import { MediaQueryProvider } from "./context/MediaQueryContext";
import { NotificationProvider } from "./context/NotificationContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <BrowserRouter>
      <MediaQueryProvider>
        <AdminProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </AdminProvider>
      </MediaQueryProvider>
    </BrowserRouter>
  </LocalizationProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
