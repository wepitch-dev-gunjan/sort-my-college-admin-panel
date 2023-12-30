import * as React from "react";
import "./style.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext";

function App() {
  const { admin, setAdmin } = useContext(AdminContext);
  const { isLoggedIn } = admin;
  return (
    <div>
      <Routes>
        {isLoggedIn ? (
          <>
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
  );
}

export default App;
