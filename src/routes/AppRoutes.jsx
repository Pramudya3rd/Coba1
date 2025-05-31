import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import HomePage from '../pages/HomePage';
import OurVilla from '../pages/OurVilla';
import AboutPage from '../pages/AboutPage';
import FaqPage from '../pages/FaqPage';
import ContactPage from '../pages/ContactPage';
import DetailsVilla from '../pages/DetailsVilla';
import Payment from '../pages/Payment';
import Confirmation from '../pages/Confirmation';
import Invoice from '../pages/Invoice';
import Login from '../pages/Login';
import Booking from '../pages/Booking'; 
import Register from '../pages/Register';
import ForgotPasswordPage from '../pages/ForgotPassword'; 
import ResetPassword from '../pages/ResetPassword';
import PasswordUpdated from "../pages/PasswordUpdated";
import ProfilePage from "../pages/ProfilePage";
import Owner from "../pages/Owner";
import AddVilla from "../pages/AddVilla"
import ViewVilla from "../pages/ViewVilla"
import EditVilla from "../pages/EditVilla"
import NotFoundPage from "../pages/NotFoundPage";
import ForbiddenPage from "../pages/ForbiddenPage";
import Admin from "../pages/Admin";
import ManageOwner from "../pages/ManageOwner";



export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/our-villa" element={<OurVilla />} />
      <Route path="/villa-detail" element={<DetailsVilla />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/invoice" element={<Invoice />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/owner-page" element={<Owner/>} />
      <Route path="/add-villa" element={<AddVilla />} />
      <Route path="/view-villa" element={<ViewVilla />} />
      <Route path="/edit-villa" element={<EditVilla />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} /> 
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/password-updated" element={<PasswordUpdated />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/forbidden" element={<ForbiddenPage />} />
      <Route path="/admin-page" element={<Admin />} />
      <Route path="/manage-owner" element={<ManageOwner />} />

    </Routes>
  );
}
