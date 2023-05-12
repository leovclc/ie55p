import { BrowserRouter as Router, Route, Redirect, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './NavigationBar/NavigationBar';
import HomeHero from './homepage/homehero';
import HomeFeatures from './homepage/homefeatures';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState , useEffect} from 'react';
import Footer from './footer/Footer';
import React from 'react';
import SubHeader from './subheader/Subheader';
import TrafficAndCarbonEstimator from './trafficAndCarbonEstimator/TrafficAndCarbonEstimator';

function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }, []);

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={
          <>
            <HomeHero />
            <HomeFeatures />
          </>} />

        <Route path="/footprint" element={
          <main id="main">
            <SubHeader name = "Footprint"/>
            <TrafficAndCarbonEstimator/>
          </main>}/>
          
       

        <Route path="/travel" element={
          <main id="main">
            <SubHeader name = "Travel"/>
          
          </main>}>
      
        </Route>

        
        <Route path="/educaiton" element={
          <main id="main">
            <SubHeader name="Education"/>
          
          </main>}>
        
        </Route> 

        <Route path="/information/state" element={
          <main id="main">
            <SubHeader name = "State Information"/>
          
          </main>}>
        
        </Route>

        <Route path="/information/transport" element={
          <main id="main">
            <SubHeader name = "Transport Information"/>
          
          </main>}>
        
        </Route>

        <Route path="/test" element={
          <main id="main">
            <SubHeader name = "Test"/>
          
          </main>}>
        
        </Route>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
