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
    <div>
      <div ref={mapContainerRef} style={{ height: "400px", width: "100%" }} />
      <button onClick={handleButtonClick}>Get My Location</button>
      <h1>latitude : {location.lat}</h1>
      <h1>longitude : {location.lng}</h1>
    </div>
  );
};

export default LocationTracker;
