import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";

import { useAppDispatch } from "./redux/app/hooks";

import Notes from "./Notes/Notes";
import CreateNote from "./Notes/CreateNote";
import { checkAuth } from "./redux/features/auth/authSlice";
import Header from "./components/Header/Header";
import AuthForm from "./components/AuthForm";
import HomePage from "./components/HomePage";
import ProtectedRouteNotes from "./utils/ProtectedRouteNotes";
import PageNotFound from "./utils/PageNotFound";
import ProtectedRouteAuth from "./utils/ProtectedRouteAuth";

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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={
          <ProtectedRouteAuth><AuthForm form="login" /></ProtectedRouteAuth>} />
        <Route path="/register" element={
          <ProtectedRouteAuth><AuthForm form="register"/></ProtectedRouteAuth>} />
        <Route path="/notes" element={
          <ProtectedRouteNotes><Notes /></ProtectedRouteNotes>} />
        <Route path="/create" element={
          <ProtectedRouteNotes><CreateNote /></ProtectedRouteNotes>} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
