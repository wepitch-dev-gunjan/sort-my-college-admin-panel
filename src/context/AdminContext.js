import React, { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
const [queries, setQueries] = useState([])
  const getTokenFromURL = () => new URLSearchParams(location.search).get('token');
  const getAdminFromURL = () => new URLSearchParams(location.search).get('admin');

  const tokenFromURL = getTokenFromURL();
  const adminFromURL = getAdminFromURL();

  const storedToken = localStorage.getItem('token') || '';
  const storedAdmin = JSON.parse(JSON.parse(localStorage.getItem('admin'))) || {}; // Parsing stored admin data

  useEffect(() => {
    if (storedAdmin && storedToken) {
      setAdmin({
        _id: storedAdmin?._id,
        name: storedAdmin?.name,
        email: storedAdmin?.email,
        profile_pic: storedAdmin?.profile_pic,
        token: storedToken,
        isLoggedIn: !!storedToken,
      })
    }
    if (tokenFromURL && adminFromURL) {
      localStorage.setItem('token', tokenFromURL);
      localStorage.setItem('admin', JSON.stringify(adminFromURL));
      setAdmin({
        _id: adminFromURL?._id || "",
        name: adminFromURL?.name || "Avatar",
        email: adminFromURL?.email || "demo.email@domain.com",
        // profile_pic: adminFromURL?.profile_pic || "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp",
        token: tokenFromURL,
        isLoggedIn: true,
      });
      navigate("/dashboard");
    }
  }, [tokenFromURL, adminFromURL, navigate]);

  useEffect(() => {
    if (!admin.isLoggedIn) {
      navigate("/login");
    }
  }, [admin.isLoggedIn, navigate]);

  return (
    <AdminContext.Provider value={{ admin, setAdmin ,queries, setQueries
    }}>
      {children}
    </AdminContext.Provider>
  );
};
