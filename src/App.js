import * as React from "react";
import { useRef } from "react";
// import "rsuite/dist/rsuite-no-reset.min.css";
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
import AddWebinar from "./components/addWebinar";
import { WebinarContext } from "./context/WebinarContext";
import Help from "./pages/help";
import JoinWebinar from "./pages/joinWebinar";
import Banners from "./pages/banners";
import AddBanner from "./pages/banners/addBanner";
import { BannerContext } from "./context/BannerContext";
import UserDetails from "./pages/userDetails";
import Webinar from "./pages/webinar";

// import FaqAndTroubleshooting from "./pages/faqAndTroubleshooting";
// import QuestionForum from "./pages/questionForum";
function App() {
  const addProfilePicRef = useRef(null);
  const { admin, setAdmin } = useContext(AdminContext);
  const { isLoggedIn } = admin;
  const { addMode, webinars, setWebinars, setAddMode } =
    useContext(WebinarContext);
  const { notificationsEnable, setNotificationsEnable, notificationsRef } =
    useContext(NotificationContext);
  const { profilePicEditMode, setProfilePicEditMode } =
    useContext(ProfileContext);
  const { addBannerMode } = useContext(BannerContext);

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
          <AddWebinar setAddMode={setAddMode} />
        </div>
      )}
      {isLoggedIn && <Header handleLogout={handleLogout} />}
      {profilePicEditMode && (
        <div className="add-profile-pic-panel">
          <AddProfilePic ref={addProfilePicRef} />
        </div>
      )}

      {addBannerMode && (
        <div classname="add-profile-pic-panel">
          <AddBanner />
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
                <Route
                  path="/user/user-details/:user_id"
                  element={<UserDetails />}
                />
                <Route path="/counsellors" element={<Counsellor />} />
                <Route path="/banners" element={<Banners />} />
                <Route
                  path="/counsellors/counsellor-profile/:counsellor_id"
                  element={<CounsellorProfile />}
                />
                <Route path="/webinar" element={<Webinar />} />
                {/* <Route path="/webinar" element={<Webinar />} /> */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/help" element={<Help />} />
                {/* <Route path ="/help/faq-and-troubleshooting" element = {<FaqAndTroubleshooting />}/> */}
                {/* <Route path="/question-forum" element={<QuestionForum />} /> */}

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
