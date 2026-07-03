import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import TourDetails from "../pages/ToursDetails";
import Tours from "../pages/Tours";
import Login from "../pages/Login";
import Register from "../pages/Register";

import TicketPage from "../pages/Ticket";
import Destinations from "../pages/Destinations";
import TravelGuides from "../pages/TravelGuides";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Wishlist from "../pages/Wishlist";
import EditProfile from "../pages/EditProfile";
import MyBookings from "../pages/MyBookings";
import ScrollToTop from "../components/ScrollToTop";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <MainLayout>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tours" element={<Tours/>} />
          <Route path="/tours/:id" element={<TourDetails />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/ticket/:id"element={<TicketPage/>}/>
          <Route path="/destinations" element={<Destinations/>}/>
          <Route path="/travel-guides"element={<TravelGuides/>}/>
          <Route path="/about-us"element={<About/>}/>
          <Route path="/contact-us" element={<Contact/>} />
          <Route path="/wishlist"element={<Wishlist/>}/>
          <Route path="/edit-profile"element={<EditProfile/>}/>
          <Route path="/my-bookings"element={<MyBookings/>}/>
        </Routes>
        
      </MainLayout>
     
    </BrowserRouter>
  );
};

export default AppRoutes;