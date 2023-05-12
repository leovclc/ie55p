import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  TrafficLayer,
  Marker,
  DistanceMatrixService,
} from "@react-google-maps/api";
import "./TrafficMap.module.css";
import Alert from "react-bootstrap/Alert";
import styles from "./TrafficMap.module.css";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -37.8136,
  lng: 144.9631,
};

const apiKey = "AIzaSyC23ZF9voWG9vvdsTx1--xV-RI_ArHYjsA";

const TrafficMap = ({ onDistanceChange }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState("");
  const [error, setError] = useState(null);

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

  const calculateDistance = (destination) => {
    if (!destination) {
      setError("Please enter a destination.");
      return;
    }

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
            setError("Invalid destination. Please try again.");
          } else {
            const elementStatus = response.rows[0].elements[0].status;
            if (elementStatus === "NOT_FOUND" || elementStatus === "ZERO_RESULTS") {
              setError("Invalid destination. Please try again.");
            } else {
              setError(null);
              const distanceResult = response.rows[0].elements[0].distance.text;
              setDistance(distanceResult);
              onDistanceChange(distanceResult);
            }
          }
        } else {
          console.error("Error:", status);
          setError("Failed to calculate distance. Please try again.");
        }
        
      }
    );
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const handleCalculateClick = () => {
    calculateDistance(destination);
  };

  return (
    <div className="traffic-map-container">
      <Alert variant="primary">
      This function is used to view real-time updates of current Australian road conditions. 
      And when you enter the address you want to go to, the distance between you and the destination will be displayed, 
      and it will be automatically filled into the calculator below. 
      </Alert>
      <h2>For example, fill in: Monash university caulfield or Monash university clayton </h2>
      <input
        type="text"
        placeholder="Enter destination"
        value={destination}
        onChange={handleDestinationChange}
      />
      <button onClick={handleCalculateClick}>Calculate Distance</button>
      {distance && <p>Distance: {distance}</p>}
      {error && <p className="error-message">{error}</p>}
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={userLocation || center}
          zoom={13}
        >
          <TrafficLayer autoRefresh />
          {userLocation && <Marker position={userLocation} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default TrafficMap;
