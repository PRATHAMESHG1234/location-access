import React, { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const LocationTracker = () => {
  const [location, setLocation] = useState(null);
  const mapContainerRef = useRef(null);

  const handleButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(userLocation);

          // You can set the map center and zoom using the useRef and Leaflet map instance
          mapContainerRef.current.setView(userLocation, 15);

          // Note: You can also use setZoom to adjust the zoom level if needed
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <MapContainer
        center={[0, 0]} // Initial center (will be updated when user's location is available)
        zoom={1} // Initial zoom level
        style={{
          height: "400px",
          width: "100%",
          marginBottom: "20px",
        }}
        ref={mapContainerRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {location && (
          <Marker position={location}>
            <Popup>Your Location</Popup>
          </Marker>
        )}
      </MapContainer>
      <button
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "14px 20px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={handleButtonClick}
      >
        Get My Location
      </button>
      {location && (
        <div style={{ marginTop: "20px" }}>
          <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>
            Latitude: {location.lat}
          </h1>
          <h1 style={{ fontSize: "24px" }}>Longitude: {location.lng}</h1>
        </div>
      )}
    </div>
  );
};

export default LocationTracker;
