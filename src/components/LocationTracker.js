import React, { useRef, useState } from "react";

const LocationTracker = () => {
  const [location, setLocation] = useState(null);
  console.log("location", location);
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
          console.log(userLocation);

          // Update the map to show the user's current location
          const mapOptions = {
            center: userLocation,
            zoom: 15, // You can adjust the zoom level as needed
          };

          const map = new window.google.maps.Map(
            mapContainerRef.current,
            mapOptions
          );

          // Add a marker for the user's current location
          new window.google.maps.Marker({
            position: userLocation,
            map: map,
            title: "Your Location",
          });
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
      <div
        ref={mapContainerRef}
        style={{
          height: "400px",
          width: "100%",
          marginBottom: "20px",
          border: "1px solid #ccc",
        }}
      />
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
