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
import { CounsellorProvider } from "./context/CounsellorContext";
import { HelpProvider } from "./context/HelpContext";
import { SocketProvider } from "./context/SocketContext";
import { BannerProvider } from "./context/BannerContext";
import { AccommodationProvider } from "./context/AccommodationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <BrowserRouter future={{ v7_startTransition: true }}>
      <MediaQueryProvider>
        <AdminProvider>
          <ProfileProvider>
            <AccommodationProvider>
              <SocketProvider>
                <HelpProvider>
                  <DashboardProvider>
                    <BannerProvider>
                      <WebinarProvider>
                        <NotificationProvider>
                          <CounsellorProvider>
                            <App />
                          </CounsellorProvider>
                        </NotificationProvider>
                      </WebinarProvider>
                    </BannerProvider>
                  </DashboardProvider>
                </HelpProvider>
              </SocketProvider>
            </AccommodationProvider>
          </ProfileProvider>
        </AdminProvider>
      </MediaQueryProvider>
    </BrowserRouter>
  </LocalizationProvider >
);
