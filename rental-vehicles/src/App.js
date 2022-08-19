import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Vehicle } from "./Pages"

import AdminLayout from "./Components/AdminLayout";
import ClientLayout from "./Components/ClientLayout";
import HomePage from "./Components/HomePage";

import 'antd/dist/antd.min.css'
import './App.css';
import { useState } from "react";

function App() {

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem(process.env.REACT_APP_SESSION_TOKEN_KEY) !== null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="homepage" element={<HomePage logIn={(result) => setLoggedIn(result)} />} />
        {
          loggedIn &&
          [
            <Route path="client" element={<ClientLayout />} />,
            <Route path="admin" element={<AdminLayout />} />,
            <Route path="admin/vehicle/new" element={<Vehicle />} />,
            <Route path="admin/vehicle/:vehicleId" element={<Vehicle />} />
          ]
        }
        <Route path="*" element={<Navigate to="homepage" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
