import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LogIn, SignIn, Client, AdminRequests, AdminVehicles, Vehicle } from "./Pages"
import 'antd/dist/antd.min.css'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="signin" element={<SignIn/>} />
        <Route path="login" element={<LogIn/>} />
        <Route path="admin/requests" element={<AdminRequests/>} />
        <Route path="admin/vehicles" element={<AdminVehicles/>} />
        <Route path="admin/vehicle/new" element={<Vehicle/>} />
        <Route path="admin/vehicle/:vehicleId" element={<Vehicle/>} />
        <Route path="client" element={<Client/>} />
        <Route path="*" element={<Navigate to="signin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
