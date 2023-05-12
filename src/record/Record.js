import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  TrafficLayer,
  Marker,
  DistanceMatrixService,
} from "@react-google-maps/api";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import './Record.css';
import Highcharts from "highcharts";
import Button from 'react-bootstrap/Button';

const apiKey = "AIzaSyC23ZF9voWG9vvdsTx1--xV-RI_ArHYjsA";

const Record = () => {
  const [inputDistance, setInputDistance] = useState("");
  const [error, setError] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState("");
  const [transportation, setTransportation] = useState("car");
  const [dayOfWeek, setDayOfWeek] = useState("Monday");
  const [carbonEmission, setCarbonEmission] = useState("");
  const [results, setResults] = useState({
    Monday: { distance: 0, carbonFootprint: 0 },
    Tuesday: { distance: 0, carbonFootprint: 0 },
    Wednesday: { distance: 0, carbonFootprint: 0 },
    Thursday: { distance: 0, carbonFootprint: 0 },
    Friday: { distance: 0, carbonFootprint: 0 },
  });

  const handleInputDistanceChange = (event) => {
    setInputDistance(event.target.value);
  };

  const [showResults, setShowResults] = useState(false);

  const handleTransportationChange = (event) => {
    setTransportation(event.target.value);
  };

  const handleDayOfWeekChange = (event) => {
    setDayOfWeek(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const calculateDistance = () => {
    if (inputDistance === "" && destination === "") {
      setError("请输入距离或目的地");
      return;
    }

    if (inputDistance !== "" && parseFloat(inputDistance) > 0) {
      setError(""); // 清除错误提示
      const distanceResult = parseFloat(inputDistance);
      setDistance(distanceResult);
      calculateCarbonEmission(distanceResult);
    } else {
    if (inputDistance !== "" && parseFloat(inputDistance) >= 0) {
      const distanceResult = parseFloat(inputDistance);
      setDistance(distanceResult);
      calculateCarbonEmission(distanceResult);
    } else {
    const distanceMatrix = new window.google.maps.DistanceMatrixService();
    distanceMatrix.getDistanceMatrix(
      {
        origins: [userLocation],
        destinations: [destination],
        travelMode: "DRIVING",
      },
      (response, status) => {
        if (status === "OK") {
          const destinationAddress = response.destinationAddresses[0];
          if (!destinationAddress) {
            console.error("Invalid destination. Please try again.");
          } else {
            const elementStatus = response.rows[0].elements[0].status;
            if (elementStatus === "NOT_FOUND" || elementStatus === "ZERO_RESULTS") {
              console.error("Invalid destination. Please try again.");
            } else {
              const distanceResult = response.rows[0].elements[0].distance.value / 1000;
              setDistance(distanceResult);
              calculateCarbonEmission(distanceResult);
            }
          }
        } else {
          console.error("Error:", status);
        }
      }
    );}}
  };

  const handleReset = () => {
    setInputDistance("");
    setDestination("");
    setError("");
    setShowResults(false);

    const resetResults = {
      Monday: { distance: 0, carbonFootprint: 0 },
      Tuesday: { distance: 0, carbonFootprint: 0 },
      Wednesday: { distance: 0, carbonFootprint: 0 },
      Thursday: { distance: 0, carbonFootprint: 0 },
      Friday: { distance: 0, carbonFootprint: 0 },
    };
    setResults(resetResults);
    updateHighchart(resetResults);
  };

  const calculateCarbonEmission = (distance) => {
    let emissionFactor = 0;
    switch (transportation) {
      case "car":
        emissionFactor = 10;
        break;
      case "bus":
        emissionFactor = 20;
        break;
      case "plane":
        emissionFactor = 100;
        break;
      default:
        break;
    }
    const carbonEmissionResult = emissionFactor * distance;
    setCarbonEmission(carbonEmissionResult);
    setShowResults(true);
    setResults((prevResults) => ({
      ...prevResults,
      [dayOfWeek]: {
        distance: prevResults[dayOfWeek].distance + distance,
        carbonFootprint: prevResults[dayOfWeek].carbonFootprint + carbonEmissionResult,
      },
    }));
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(pos);
      });
    }
  }, []);


  useEffect(() => {
    if (showResults) {
      updateHighchart(results);
    }
  }, [results]);

  const updateHighchart = (results) => {
    const categories = Object.keys(results);
    const carbonFootprintData = categories.map((day) => results[day].carbonFootprint);

    Highcharts.chart("container", {
      chart: {
        type: "line",
      },
      title: {
        text: "Carbon Footprint by Day of Week",
      },
      xAxis: {
        categories: categories,
      },
      yAxis: {
        title: {
          text: "Carbon Footprint (g)",
        },
      },
      series: [
        {
          name: "Carbon Footprint",
          data: carbonFootprintData,
        },
      ],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    calculateDistance();
  };

  const onLoad = React.useCallback(function onLoad() {
    // Your code to initialize Google Maps goes here
  }, [])

  return (
    <div className="calbackground">
      <LoadScript googleMapsApiKey={apiKey} onLoad={onLoad}>
      <h1>Show your Carbon Footprint</h1>
      <Alert variant="dark" style={{ display: 'inline-block' }}>
      Please fill in your destination and departure date, for example, select Monday as the date and go to Monash university caulfield as your destination.
      </Alert>
      <form onSubmit={handleSubmit}>
        <label>
          Transportation:
          <select value={transportation} onChange={handleTransportationChange}>
            <option value="car">Car</option>
            <option value="bus">Bus</option>
            <option value="flight">Flight</option>
          </select>
        </label>
        <br />
        <label>
          Day of Week:
          <select value={dayOfWeek} onChange={handleDayOfWeekChange}>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
          </select>
        </label>
        <br />
        <label>
          Destination:
          <input type="text" value={destination} onChange={handleDestinationChange} />
        </label>
        <br />
        <label>
            Distance (optional):
            <input
              type="number"
              min="0"
              step="any"
              value={inputDistance}
              onChange={handleInputDistanceChange}
            />
          </label>
          <br />
        <Button type="submit" variant="outline-info" size="lg">Submit it</Button>

      </form>
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
      {showResults && (
      <table style={{ margin: "20px auto", borderCollapse: "collapse", textAlign: "center" }}>
      <thead>
        <tr>
          <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Day of Week</th>
          <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Distance (km)</th>
          <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Carbon Footprint (g)</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(results).map(([day, { distance, carbonFootprint }]) => (
          <tr key={day}>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{day}</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{distance}</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{carbonFootprint}</td>
          </tr>
        ))}
      </tbody>
    </table>
)}
        <Button type="button" onClick={handleReset} variant="outline-info" size="lg" style={{ marginLeft: "10px" }}>
          Reset
        </Button>
      <div id="container" style={{ width: "100%", height: "400px", marginTop: "20px" }}></div>
      </LoadScript>
    </div>
  );
}

export default Record;  