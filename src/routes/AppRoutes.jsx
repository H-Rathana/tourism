import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import TourDetails from "../pages/ToursDetails";
import Tours from "../pages/Tours";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";



const AppRoutes = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tours" element={<Tours/>} />
          <Route path="/tours/:id" element={<TourDetails />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default AppRoutes;