import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SignupForm from "./auth/forms/SignupForm";
import SigninForm from "./auth/forms/SigninForm";
import Home from "./pages/Home";
import Vehicleform from "./components/Vehicleform";
import UpdateVehicle from "./components/UpdateVehicle";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<SigninForm />} />
          <Route path="/signup" element={<SignupForm />} />

          <Route path="/" element={<Home />} />
          <Route path="/add-vehicle" element={<Vehicleform/>} />
          <Route path="/update-vehicle/:id" element={<UpdateVehicle/>} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
};

export default App;
