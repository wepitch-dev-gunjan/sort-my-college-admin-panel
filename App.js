import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        {/* {isLoggedIn ? ( */}
        <>
          {/* <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} /> */}
        </>
        {/* ) : ( */}
        <>
          {/* <Route path="*" element={<Navigate replace to="/login" />} /> */}
          {/* <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Login />} />
            <Route path="/password-reset" element={<Login />} /> */}
        </>
        {/* )} */}
      </Routes>
    </div>
  );
}

export default App;
