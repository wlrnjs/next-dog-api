"use client";

import React, { useEffect} from "react";
import style from "./page.module.css";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Page() {
  useEffect(() => {
    const kakaoMapScript = document.createElement('script')
    kakaoMapScript.async = false
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false`
    document.head.appendChild(kakaoMapScript)

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map')
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        }

        // 1. 지도 띄우기
        const map = new window.kakao.maps.Map(container, options);

        // 2. 중앙에 핀 꽂기
        let marker = new window.kakao.maps.Marker({
          map: map,
          position: map.getCenter()
        });
      })
    }

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI)
  }, [])

  return (
    <div className={style.container}>
      <div id="map" className={style.map}></div>
    </div>
  )
}