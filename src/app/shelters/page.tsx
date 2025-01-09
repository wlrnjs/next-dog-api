"use client";

import React, { useEffect, useRef, useState } from "react";
import style from "./page.module.css";

export default function Page() {
  const mapRef = useRef(null); // 지도를 표시할 div를 참조
  const [userLocation, setUserLocation] = useState(null); // 사용자 위치 상태
  const [isMapLoaded, setIsMapLoaded] = useState(false); // 맵 로드 여부 상태

  useEffect(() => {
    const loadKakaoMaps = () => {
      // Kakao Maps 스크립트가 이미 로드되었는지 확인
      if (window.kakao && window.kakao.maps) {
        initializeMap();
        return;
      }

      // Kakao Maps API 스크립트 추가
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        // Kakao Maps SDK 로드 후 지도 초기화
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(initializeMap);
        } else {
          console.error("Kakao Maps SDK 로드 실패");
        }
      };
      script.onerror = () => {
        console.error("Kakao Maps 스크립트 로드 실패");
      };
      document.body.appendChild(script);
    };

    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error("위치 정보를 가져오지 못했습니다.", error);
            // 기본 좌표로 서울시청을 설정
            setUserLocation({ lat: 37.5665, lng: 126.9780 });
          }
        );
      } else {
        console.error("Geolocation을 지원하지 않는 브라우저입니다.");
      }
    };

    const initializeMap = () => {
      if (userLocation && mapRef.current) {
        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
          level: 3,
        });

        // 마커 추가
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
          map: map,
        });

        setIsMapLoaded(true); // 맵이 로드되었음을 상태로 표시
        console.log("지도 및 마커가 성공적으로 생성되었습니다.");
      } else {
        console.error("userLocation이나 mapRef.current가 존재하지 않습니다.");
      }
    };

    // 위치 정보를 가져온 후, 카카오 맵 API 로드
    if (userLocation) {
      loadKakaoMaps(); // 카카오 맵 API 로드
    } else {
      getUserLocation(); // 사용자의 위치 가져오기
    }
  }, [userLocation]); // userLocation이 변경될 때마다 실행

  return (
    <div className={style.container}>
      <div ref={mapRef} className={style.map}></div>
    </div>
  );
}