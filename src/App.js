import './App.css';
import React, { Component, useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Signup from './components/Signup';
import Login from './components/Login';

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT
};


const App = () => {

  let [progress, setProgress] = useState(0);
  // let apiKey = "963d5fdc9a624d588b02133758d6536e";

  let pageSize = 5;
  return (
    <Provider template={AlertTemplate} {...options}>

    <BrowserRouter>

      {/* <NavBar /> */}
      <LoadingBar
        color='#f11946'
        height={5}
        progress={progress}
      />
      <Routes>
        <Route exact path="/"  element={<News setProgress={setProgress} key="home" pageSize={pageSize} country="in" category="general" />} />
        <Route exact path="/signup" element={<Signup/>} />
        <Route exact path="/login" element={<Login/>} />

       </Routes>
    </BrowserRouter>
  </Provider>

  )

}

export default App;