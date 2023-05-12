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
import Weather2 from './recommendationweather/Weather';
import { Alert } from 'react-bootstrap';
import Record from './record/Record';

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
            <div className="whole-recommendation">
        {/* <Alert variant="info" className='centered-alert'>
           Enter a destination to get travel suggestions. For example, fill in: Monash university caulfield or Monash university clayton.
        </Alert> */}
        <div className="middle-recommendation">
            {/*<div className="left-component">
              <OriginMap></OriginMap>
            </div>*/}
            <div>
              {/* <TransportPage></TransportPage> */}
              <Weather2></Weather2>
            </div>
         </div>
            <Alert variant="info" className='bottom-alert' >
                Tips:   Are you satisfied with our recommendation results, and want to check more low-carbon travel knowledge?
            </Alert>
         </div>
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

        <Route path="/track" element={
          <main id="main">
            <SubHeader name = "track"/>
            <Record></Record>
          </main>}>
        
        </Route>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
