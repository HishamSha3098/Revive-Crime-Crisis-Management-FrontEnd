import React, { useState, useEffect } from "react";
import Crisis from "./event";

function LocationPicker({ onLocationChange }) {
  const [longval, setLongval] = useState(120.994260);
  const [latval, setLatval] = useState(14.593999);

  const mapRef = React.useRef();
  let marker = null;
  let infoWindow = null;

  const loadGoogleMapsScript = (callback) => {
    if (!window.google || !window.google.maps) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCPvqKJigbPJWjWpPcHXQ-c5TxuHTXQaRM&libraries=places`;
      script.onload = () => {
        if (callback) callback();
      };
      document.body.appendChild(script);
    } else {
      if (callback) callback();
    }
  };

  const initializeMap = () => {
    const curpoint = new window.google.maps.LatLng(latval, longval);

    const mapOptions = {
      center: curpoint,
      zoom: 10,
      mapTypeId: 'roadmap'
    };

    const map = new window.google.maps.Map(mapRef.current, mapOptions);

    marker = new window.google.maps.Marker({
      map: map,
      position: curpoint
    });

    infoWindow = new window.google.maps.InfoWindow();

    map.addListener('click', handleMapClick);
    marker.addListener('click', handleMarkerClick);

    updateInfoWindow();
  };

  const handleMapClick = (event) => {
    const newLongval = event.latLng.lng().toFixed(6);
    const newLatval = event.latLng.lat().toFixed(6);
    onLocationChange(newLatval, newLongval);
    setLongval(newLongval);
    setLatval(newLatval);
  };

  const handleMarkerClick = () => {
    updateInfoWindow();
    infoWindow.open(marker.getMap(), marker);
  };

  const updateMapMarker = () => {
    const curpoint = new window.google.maps.LatLng(latval, longval);

    marker.setPosition(curpoint);
    marker.getMap().setCenter(curpoint);

    updateInfoWindow();
  };

  const updateInfoWindow = () => {
    const content = `Longitude: ${longval}<br>Latitude: ${latval}`;
    infoWindow.setContent(content);
  };

  const handleJumpToLocation = () => {
    updateMapMarker();
  };

  useEffect(() => {
    loadGoogleMapsScript(() => {
      initializeMap();
    });
  }, [latval, longval]);

  return (
    <>
    {/* <Crisis a={latval} b={longval}/> */}
    <div>
      <div>
        <br/>
        <div style={{ backgroundColor: "#E0E0E0", height: "250px" }} ref={mapRef}>
          <p>- click on the map to change marker position</p>
          <p>- click on the marker to view longitude/latitude information</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default LocationPicker;
