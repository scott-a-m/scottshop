import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerfiyEmail";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import AccountPortal from "./pages/AccountPortal";
import NotFound from "./pages/NotFound";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import SidebarHeader from "./components/SidebarHeader";
import Store from "./pages/Store";
import SingleProduct from "./pages/SingleProduct";
import Basket from "./pages/Basket";
import StripeCheckout from "./pages/StripeCheckout";
import WriteReview from "./pages/WriteReview";
import ProtectedRoute from "./pages/ProtectedRoute";
import Contact from "./pages/Contact";
import Credits from "./pages/Credits";
import EditReview from "./pages/EditReview";

const App = () => {
  return (
    <BrowserRouter>
      <SidebarHeader />
      <Sidebar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/basket" element={<Basket />} />
        <Route path="/store/:id" element={<SingleProduct />} />
        <Route
          path="/store/checkout"
          element={
            <ProtectedRoute>
              <StripeCheckout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/account"
          element={
            <ProtectedRoute>
              <AccountPortal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/account/writereview"
          element={
            <ProtectedRoute>
              <WriteReview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/account/review/:id"
          element={
            <ProtectedRoute>
              <EditReview />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/verify-email" element={<VerifyEmail />} />
        <Route path="/user/reset-password" element={<ResetPassword />} />
        <Route path="/user/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
