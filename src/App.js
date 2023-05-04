import { BrowserRouter as Router, Route, Redirect, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './NavigationBar/NavigationBar';
import HomeHero from './homepage/homehero';
import HomeFeatures from './homepage/homefeatures';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
      <Route path="/" element={
          <>
            <HomeHero />
            <HomeFeatures />
          </>} />

        <Route path="/footprint">
        
        </Route>

        <Route path="/travel">
        
        </Route>

        <Route path="/education">
        
        </Route>

        <Route path="/information/stateInformation">
        
        </Route>

        <Route path="/information/transportInformation">
        
        </Route>

        <Route path="/test">
        
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
