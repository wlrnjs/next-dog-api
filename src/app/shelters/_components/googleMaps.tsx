"use client"

import React, { useEffect, useRef, useState } from 'react';
import style from "./googleMaps.module.css";
// import fetchCenterData from "@/app/_api/fetchCenterData";

const GoogleMaps = () => {
  const mapRef = useRef(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const mapInstance = useRef(null); // Google Maps 객체를 저장
  const markerInstance = useRef(null); // 마커 객체를 저장

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const currentLat = pos.coords.latitude;
        const currentLng = pos.coords.longitude;
        setLat(currentLat);
        setLng(currentLng);
        console.log("현재 위치는: " + currentLat + ", " + currentLng);
      },
      (error) => console.error("Geolocation error:", error)
    );
  }, []);

  useEffect(() => {
    const loadGoogleMaps = () => {
      const script = document.createElement('script');
      script.src = `${process.env.NEXT_PUBLIC_GOOGLE_API_URL}?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
      script.async = true;
      script.onload = () => {
        if (mapRef.current && lat !== null && lng !== null) {
          mapInstance.current = new window.google.maps.Map(mapRef.current, {
            center: { lat, lng },
            zoom: 11,
          });

          // 마커 추가
          markerInstance.current = new window.google.maps.Marker({
            position: { lat, lng },
            map: mapInstance.current,
            title: "현재위치",
          });
        }
      };
      document.body.appendChild(script);
    };

    loadGoogleMaps();
  }, [lat, lng]);

  useEffect(() => {
    if (markerInstance.current && lat !== null && lng !== null) {
      markerInstance.current.setPosition({ lat, lng });
    }
    if (mapInstance.current && lat !== null && lng !== null) {
      mapInstance.current.setCenter({ lat, lng });
    }
  }, [lat, lng]);

  return (
    <div className={style.container}>
      <div ref={mapRef} className={style.maps}></div>
    </div>
  );
};

export default GoogleMaps;