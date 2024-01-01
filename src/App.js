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
import { Notifications } from "@mui/icons-material";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import { NotificationContext } from "./context/NotificationContext";
import useClickOutside from "./customHooks/useClickOutside";
import { ProfileContext } from "./context/ProfileContext";
import AddProfilePic from "./components/profilePic/addProfilePic";
import User from "./pages/user";
import Counsellor from "./pages/counsellor";

function App() {
  const addProfilePicRef = useRef(null);
  const { admin, setAdmin } = useContext(AdminContext);
  const { isLoggedIn } = admin;
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
          <Routes>
            {isLoggedIn ? (
              <>
                <Route path="/login" element={<Navigate replace to="/" />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/user" element={<User />} />
                <Route path="/counsellor" element={<Counsellor />} />
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
