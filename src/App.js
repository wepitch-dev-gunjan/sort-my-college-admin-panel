import * as React from "react";
import { useRef } from "react";
import "./style.scss";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Payment from "./pages/payment";
import Profile from "./pages/profile/Profile";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext";
import { ToastContainer } from "react-toastify";
import Notifications from "./components/notifications";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import { NotificationContext } from "./context/NotificationContext";
import useClickOutside from "./customHooks/useClickOutside";
import { ProfileContext } from "./context/ProfileContext";
import AddProfilePic from "./components/profilePic/addProfilePic";
import User from "./pages/user";
import Counsellor from "./pages/counsellor";
import CounsellorProfile from "./pages/counsellorProfile";
import PaymentDetails from "./pages/paymentDetails";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from "./components/breadcrumb";
import Webinar from "./pages/webinar";
import AddWebinar from "./components/addWebinar";
import { WebinarContext } from "./context/WebinarContext";

function App() {
  const addProfilePicRef = useRef(null);
  const { admin, setAdmin } = useContext(AdminContext);
  const { isLoggedIn } = admin;
  const { addmode, webinars, setWebinars, setAddMode } = useContext(WebinarContext)
  const { notificationsEnable, setNotificationsEnable, notificationsRef } =
    useContext(NotificationContext);
  const { profilePicEditMode, setProfilePicEditMode } =
    useContext(ProfileContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAdmin({ ...admin, isLoggedIn: false });
    navigate("/login");
  };

  useClickOutside(addProfilePicRef, () => {
    setProfilePicEditMode((prev) => !prev);
  });

  useClickOutside(notificationsRef, () => {
    setNotificationsEnable(false);
  });
  return (
    <div>
      {addMode && (
        <div className="add-session-container">
          <AddWebinar
            webinars={webinars}
            setWebinars={setWebinars}
            setAddMode={setAddMode}
          />
        </div>
      )}
      {isLoggedIn && <Header handleLogout={handleLogout} />}
      {profilePicEditMode && (
        <div className="add-profile-pic-panel">
          <AddProfilePic ref={addProfilePicRef} />
        </div>
      )}
      <div className="main">
        <ToastContainer />

        {notificationsEnable && <Notifications />}

        {isLoggedIn && <Sidebar />}
        <div className={`${isLoggedIn && "main-content"}`}>
          {isLoggedIn && (
            <div className="breadcrumb-main">
              <Breadcrumb />
            </div>
          )}
          <Routes>
            {isLoggedIn ? (
              <>
                <Route path="/login" element={<Navigate replace to="/" />} />
                <Route path="/payment" element={<Payment />} />
                <Route
                  path="/payment/payment-details"
                  element={<PaymentDetails />}
                />
                <Route path="/user" element={<User />} />
                <Route path="/counsellors" element={<Counsellor />} />
                <Route
                  path="/counsellors/counsellor-profile"
                  element={
                    <CounsellorProfile />
                    // <MuiCounsellorProfile />
                  }
                />
                <Route path="/webinar" element={<Webinar />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/" element={<Dashboard />} />
              </>
            ) : (
              <>
                <Route path="*" element={<Navigate replace to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Login />} />
                <Route path="/password-reset" element={<Login />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
