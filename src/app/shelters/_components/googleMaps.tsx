"use client"

import React, { useEffect, useRef } from 'react';
import style from "./googleMaps.module.css";
import fetchCenterData from "@/app/_api/fetchCenterData";

const GoogleMaps = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadCenterData = async () => {
      try {
        const data = await fetchCenterData();
        console.log('Fetched data:', data);
      } catch (error) {
        console.error('Error fetching center data:', error);
      }
    };

    loadCenterData();
  }, []);

  useEffect(() => {
    // Google Maps API 로드
    const loadGoogleMaps = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
      script.async = true;
      script.onload = () => {
        // Google Maps 초기화
        if (mapRef.current) {
          new window.google.maps.Map(mapRef.current, {
            center: { lat: 37.5665, lng: 126.9780 }, // 서울 좌표
            zoom: 12,
          });
        }
      };
      document.body.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  return (
    <div className={style.container}>
      <div ref={mapRef} className={style.maps}></div>
    </div>
  );
};

export default GoogleMaps;