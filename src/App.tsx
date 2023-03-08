import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";

import { useAppDispatch } from "./redux/app/hooks";

import Notes from "./Notes/Notes";
import CreateNote from "./Notes/CreateNote";
import { checkAuth } from "./redux/features/auth/authSlice";
import Header from "./components/Header/Header";
import LoginForm from "./components/AuthForm/LoginForm";
import SignUpForm from "./components/AuthForm/SignUpForm";
import HomePage from "./pages/HomePage";
import ProtectedRouteNotes from "./utils/ProtectedRouteNotes";
import PageNotFound from "./components/NotFound/PageNotFound";
import ProtectedRouteAuth from "./utils/ProtectedRouteAuth";
import ShopPage from "./pages/ShopPage";
import Product from "./components/Shop/Product/Product";
import Cart from "./components/Shop/Cart/Cart";
import Footer from "./components/Footer/Footer";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

 

  return (
    <div className="App">
      <Header />
      <main className="main">
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="shop" element={<ShopPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="shop/:id" element={<Product />} />
        <Route path="login" element={
          <ProtectedRouteAuth>
            <LoginForm />
          </ProtectedRouteAuth>} />
        <Route path="register" element={
          <ProtectedRouteAuth><SignUpForm /></ProtectedRouteAuth>} />
        <Route path="notes" element={
          <ProtectedRouteNotes><Notes /></ProtectedRouteNotes>} />
        <Route path="create" element={
          <ProtectedRouteNotes><CreateNote /></ProtectedRouteNotes>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
