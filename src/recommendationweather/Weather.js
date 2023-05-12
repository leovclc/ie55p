import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import './Weather.css'

function Weather() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const apiKey = "AIzaSyC23ZF9voWG9vvdsTx1--xV-RI_ArHYjsA";
  const [error, setError] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [emission, setEmission] = useState(null);
  const [showEmissionAlert, setShowEmissionAlert] = useState(false);
  const [blockInfo, setBlockInfo] = useState(null);
  const [weatherFetched,setWeatherFetched] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const fetchWeatherData = useCallback(async (latitude, longitude) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=88e2ff032ca8b683249ce94aef6dd767`;
    try {
      const response = await axios.get(weatherUrl);
      setData(response.data);
      setError(false);
      setWeatherFetched(true);
    } catch (error) {
      setError(true);
      setData({});
    }
  }, []);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLng = deg2rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${apiKey}`;
      try {
        const response = await axios.get(geocodeUrl);
        const { lat, lng } = response.data.results[0].geometry.location;
        fetchWeatherData(lat, lng);
        console.log(weatherFetched);
        if (userLocation) {
          const dist = calculateDistance(userLocation.lat, userLocation.lng, lat, lng);
          setDistance(dist.toFixed(2));
          const emissionValue = dist * 3.08;
          setEmission(emissionValue.toFixed(2));
          setShowEmissionAlert(true);
          const recommendationBlocks = generateRecommendationBlocks();
          setBlockInfo(recommendationBlocks);

        }
      } catch (error) {
        setError(true);
        setData({});
      }
      setLocation("");

    }
  };

   const searchLocationButton = async () => {

        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${apiKey}`;
        try {
          const response = await axios.get(geocodeUrl);
          const { lat, lng } = response.data.results[0].geometry.location;
          fetchWeatherData(lat, lng);
          if (userLocation) {
            const dist = calculateDistance(userLocation.lat, userLocation.lng, lat, lng);
            setDistance(dist.toFixed(2));
            const emissionValue = dist * 3.08;
            setEmission(emissionValue.toFixed(2));
            setShowEmissionAlert(true);
          }
        } catch (error) {
          console.log(error);
          setError(true);
          setData({});
        }
        setLocation("");



    };


    const generateRecommendationBlocks = () => {
        // bus, car, bike, walk
        // transport, emission, time, recommended, reason
        // 0 least time
        // 1 least emission
        var recommendationBlocks = new Array(4);

        // different speeds of transportations in km/h
        const carSpeed = 70;
        const busSpeed = 40;
        const bikeSpeed = 20;
        const walkSpeed = 4;

        // time needed for different transportations
        const carTime = (distance / carSpeed).toFixed(2);
        const busTime = (distance / busSpeed).toFixed(2);
        const bikeTime = (distance / bikeSpeed).toFixed(2);
        const walkTime = (distance / walkSpeed).toFixed(2);

        // emission for different transportations in g
        const carEmission = (distance * 192).toFixed(2);
        const busEmission = (distance * 65).toFixed(2); // 1.3kg per km for bus, divided by 20 people taking the bus which gives 65g/km
        const bikeEmission = (distance * 21).toFixed(2);
        const walkEmission = (distance * 35).toFixed(2);

        for(var i=0;i<recommendationBlocks.length;i++){
            recommendationBlocks[i] = new Array(3);
        }

        // Initialize
        recommendationBlocks[0] = ["car",carEmission,carTime,"block","recommended"];
        recommendationBlocks[1] = ["bus",busEmission,busTime,"block","recommended"];
        recommendationBlocks[2] = ["bike",bikeEmission,bikeTime,"block","recommended"];
        recommendationBlocks[3] = ["walk",walkEmission,walkTime,"block","recommended"];

        // does not recommend any transportations here if distance is too far away.
        const dist = parseInt(distance,10);
        if(dist > 500){
            recommendationBlocks[0] = ["car",carEmission,carTime,"block-not","too far"];
            recommendationBlocks[1] = ["bus",busEmission,busTime,"block-not","too far"];
            recommendationBlocks[2] = ["bike",bikeEmission,bikeTime,"block-not","too far"];
            recommendationBlocks[3] = ["walk",walkEmission,walkTime,"block-not","too far"];
        }

        // does not recommend for walk if distance is bigger than 5km
        // does not recommend for bike if distance is bigger than 10km
        if(dist > 5){
            recommendationBlocks[3] = ["walk",walkEmission,walkTime,"block-not","too far"];
        }
        if(dist > 10){
            recommendationBlocks[2] = ["bike",bikeEmission,bikeTime,"block-not","too far"];
        }

        // if current time is not between 7:00 - 22:00, bus is not recommended
        var dt = new Date();//current Date that gives us current Time also
        var startTime = '07:00:00';
        var endTime = '22:00:00';
        var s =  startTime.split(':');
        var dt1 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(),
                           parseInt(s[0]), parseInt(s[1]), parseInt(s[2]));
        var e =  endTime.split(':');
        var dt2 = new Date(dt.getFullYear(), dt.getMonth(),
                           dt.getDate(),parseInt(e[0]), parseInt(e[1]), parseInt(e[2]));
        if(dt <dt1 || dt > dt2){
            recommendationBlocks[1] = ["bus",busEmission,busTime,"block-not","no bus available"];
        }

        // if it is bad weather, walking and cycling should not be recommended
        const weather = data.weather[0].main;
        const temp = data.main.temp;
        if(weather === 'Rain' || weather === 'Drizzle' || weather === 'Snow' || temp>85 || temp<40){
            recommendationBlocks[2] = ["bike",bikeEmission,bikeTime,"block-not","bad weather"];
            recommendationBlocks[3] = ["walk",walkEmission,walkTime,"block-not","bad weather"];
        }
        return recommendationBlocks;
    }

  const getTravelRecommendation = () => {
    if (!data.weather) return null;

    const weather = data.weather[0].main;
    const temp = data.main.temp;

    if (weather === 'Rain' || weather === 'Drizzle') {
      return 'It is currently raining, consider taking a car or public transportation instead of walking.'
    } else if (weather === 'Snow') {
      return 'It is currently snowing, consider taking a car or public transportation instead of walking.'
    } else if (temp > 85) {
      return 'It is currently very hot outside, consider taking a car or public transportation instead of walking.'
    } else if (temp < 40) {
      return 'It is currently very cold outside, consider taking a car or public transportation instead of walking.'
    } else if (distance > 500){
      return 'It is too far away, please consider other transportations.'
    }else if (distance > 10){
      return 'It is too far for cycling and walking, consider car'
    }else if (distance > 5){
      return 'It is too far for walking, consider car'
    }else{
      return 'The weather is nice, feel free to walk or bike to your destination!'
    }
  }

  const reset = () => {
    setData({});
    setLocation("");
    setError(false);
    setUserLocation(null);
    setDistance(null);
    setEmission(null);
    setShowEmissionAlert(false);
  };

    useEffect(()=>{
        if(weatherFetched){
            const recommendationBlocks = generateRecommendationBlocks();
            setBlockInfo(recommendationBlocks);
            setWeatherFetched(false);
        }
    },[weatherFetched])

  return (
//    <div className="app">
//      <div className="search">
//        <input
//          value={location}
//          onChange={(event) => setLocation(event.target.value)}
//          onKeyPress={searchLocation}
//          placeholder="Enter Location"
//          type="text"
//        />
//        <Button onClick={reset} variant="outline-warning">
//          Reset
//        </Button>
//      </div>
//      {error ? (
//        <div
//          style={{
//            display: "flex",
//            justifyContent: "center",
//            alignItems: "center",
//            height: "100%",
//          }}
//        >
//          <h2>Invalid location. Please try again with a valid location.</h2>
//        </div>
//      ) : (
//        <div className="container">
//          <div className="top">
//            <div className="location">
//              <p>{data.name}</p>
//            </div>
//
//            <div className="temp">
//              {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
//            </div>
//
//            <div className="description">
//              {data.weather ? <p className="bold">{data.weather[0].main}</p> : null}
//            </div>
//
//            {data.name != undefined && (
//              <div className="bottom">
//                <div className="feels">
//                  {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°F</p> : null}
//
//                  <p>Feels Like</p>
//                </div>
//                <div className="humidity">
//                  {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
//                  <p>Humidity</p>
//                </div>
//                <div className="wind">
//                  {data.wind ? <p className="bold">{data.wind.speed} MPH</p> : null}
//                  <p>Wind Speed</p>
//                </div>
//              </div>
//            )}
//
//            <div className="travel-recommendation">{getTravelRecommendation()}</div>
//
//            {distance && (
//              <div className="distance">
//                <p>The destination is {distance} km away from you.</p>
//              </div>
//            )}
//
//            {emission && showEmissionAlert && (
//              <Alert variant="primary" onClose={() => setShowEmissionAlert(false)} dismissible>
//                The estimated carbon emission for this trip is {emission} kg CO2.
//              </Alert>
//            )}
//          </div>
//        </div>
//      )}
//    </div>


    <div className="app">
      <h1 className="title">Green Travel Recommendation</h1>
      <div className="recommendationAlert">
        <Alert variant="primary" className='recommendationAlert'>We will comprehensively consider the factors of distance and weather to recommend reasonable travel methods for you. Please fill in the location eg: Monash university Caulfield.</Alert>
      </div>
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
        <Button className="submit" onClick={searchLocationButton} variant="outline-warning">Submit</Button>
        <Button onClick={reset} variant="outline-warning">
          Reset
        </Button>
      </div>
      {error ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <h2>Invalid location. Please try again with a valid location.</h2>
        </div>
      ) : (
      <div>
        <div className="weatherInfo">
            {data.main ? <p>Destination: {data.name}</p> : null}
            {data.main ? <p>Weather: {data.main.temp.toFixed()}°F {data.weather[0].main}</p> : null}
        </div>
        {data.main ? <div className="recommendation-blocks">
            <div className="upper-block">
                                    <div className={blockInfo? blockInfo[0][3]:"block"}>
                                         <div className="first-line">
                                             <p>Recommendation 1</p>
                                             <div className="tag">
                                                 <p>Shortest time</p>
                                             </div>
                                         </div>
                                         <div className="block-info">
                                             <h2>Car</h2>
                                             <h2>Emission: {blockInfo? blockInfo[0][1]: null} g</h2>
                                             <h2>Time:{blockInfo? blockInfo[0][2]:null} hour</h2>
                                         </div>
                                         <div className={blockInfo ? (blockInfo[0][3] === "block" ? "ok" : "reason") : null}>
                                            <p>{blockInfo? blockInfo[0][4]:null}</p>
                                         </div>
                                     </div>
                                     <div className={blockInfo? blockInfo[1][3]:"block"}>
                                         <div className="first-line">
                                             <p>Recommendation 2</p>
                                         </div>
                                         <div className="block-info">
                                             <h2>Bus</h2>
                                             <h2>Emission:{blockInfo? blockInfo[1][1]:null} g</h2>
                                             <h2>Time: {blockInfo? blockInfo[1][2]:null} hour</h2>
                                         </div>
                                         <div className={blockInfo? (blockInfo[1][3] === "block" ? "ok" : "reason") : null}>
                                             <p>{blockInfo? blockInfo[1][4]:null}</p>
                                         </div>
                                     </div>
            </div>
            <div className="lower-block">
                                     <div className={blockInfo? blockInfo[2][3]:"block"}>
                                         <div className="first-line">
                                             <p>Recommendation 3</p>
                                             <div className="tag">
                                                <p>Least carbon</p>
                                             </div>
                                         </div>
                                         <div className="block-info">
                                             <h2>Bike</h2>
                                             <h2>Emission:{blockInfo? blockInfo[2][1]:null} g</h2>
                                             <h2>Time: {blockInfo? blockInfo[2][2] :null} hour</h2>
                                         </div>
                                         <div className={blockInfo? (blockInfo[2][3] === "block" ? "ok" : "reason"):null}>
                                             <p>{blockInfo? blockInfo[2][4]:null}</p>
                                         </div>
                                     </div>
                                     <div className={blockInfo? blockInfo[3][3]:"block"}>
                                         <div className="first-line">
                                             <p>Recommendation 4</p>
                                         </div>
                                         <div className="block-info">
                                             <h2>Walk</h2>
                                             <h2>Emission:{blockInfo? blockInfo[3][1]:null} g</h2>
                                             <h2>Time: {blockInfo? blockInfo[3][2]:null} hour</h2>
                                         </div>
                                         <div className={blockInfo? (blockInfo[3][3] === "block" ? "ok" : "reason"):null}>
                                             <p>{blockInfo? blockInfo[3][4]:null}</p>
                                         </div>
                                     </div>
            </div>

                                   </div> : null}
            <div className={data.main?"travel-recommendation":"nothing"}>Distance: {distance}km away from you </div>
            <div className="travel-recommendation">{getTravelRecommendation()}</div>

       </div>
      )}

    </div>
  );
}


export default Weather;