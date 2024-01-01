import * as React from "react";
import { useRef } from 'react';
import "./style.scss";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext";
import { ToastContainer } from "react-toastify";
import { Notifications } from "@mui/icons-material";
import Header from './components/header'
import Sidebar from './components/sidebar'
import { NotificationContext } from "./context/NotificationContext";
import useClickOutside from './customHooks/useClickOutside';
import { ProfileContext } from "./context/ProfileContext";
import AddProfilePic from './components/profilePic/addProfilePic';

function App() {
  const addProfilePicRef = useRef(null);
  const { admin, setAdmin } = useContext(AdminContext);
  const { isLoggedIn } = admin;
  const { notificationsEnable, setNotificationsEnable, notificationsRef } =
    useContext(NotificationContext);
  const { profilePicEditMode, setProfilePicEditMode } =
    useContext(ProfileContext);
  const { coverImageEditMode, setCoverImageEditMode } =
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

    <div>9
      {isLoggedIn && <Header handleLogout={handleLogout} />}
      <div className="main">
        <ToastContainer />

        {notificationsEnable && <Notifications />}

        {isLoggedIn && <Sidebar />}

        {profilePicEditMode && (
          <div className="add-profile-pic-panel">
            <AddProfilePic ref={addProfilePicRef} />
          </div>
        )}

        <div className={`${isLoggedIn && "main-content"}`}></div>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/login" element={<Navigate replace to="/" />} />
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
  );
}

export default App;
