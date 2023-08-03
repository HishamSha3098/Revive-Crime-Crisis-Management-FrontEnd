import React, { useEffect, useRef } from "react";

const LocationMap = ({ lat, lng }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadMap = async () => {
      const { google } = window;
      if (!google || !google.maps) {
        console.error("Google Maps API not loaded.");
        return;
      }

      const mapOptions = {
        center: { lat: parseFloat(lat), lng: parseFloat(lng) }, // Parse latitude and longitude as float
        zoom: 14,
      };

      const map = new google.maps.Map(mapRef.current, mapOptions);

      // Place a marker on the map
      const marker = new google.maps.Marker({
        position: { lat: parseFloat(lat), lng: parseFloat(lng) }, // Parse latitude and longitude as float
        map,
        title: "Your Location",
      });
    };

    loadMap();
  }, [lat, lng]);

  return <div ref={mapRef} style={{ height: "400px", width: "100%" }} />;
};

export default LocationMap;
