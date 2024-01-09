import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { AdminProvider } from "./context/AdminContext";
import { BrowserRouter } from "react-router-dom";
import { MediaQueryProvider } from "./context/MediaQueryContext";
import { NotificationProvider } from "./context/NotificationContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ProfileProvider } from "./context/ProfileContext";
import { DashboardProvider } from "./context/DashboardContext";
import { WebinarProvider } from "./context/WebinarContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <BrowserRouter>
      <MediaQueryProvider>
        <AdminProvider>
          <ProfileProvider>
            <DashboardProvider>
              <WebinarProvider>
                <NotificationProvider>
                  <App />
                </NotificationProvider>
              </WebinarProvider>
            </DashboardProvider>
          </ProfileProvider>
        </AdminProvider>
      </MediaQueryProvider>
    </BrowserRouter>
  </LocalizationProvider >
);
