'use client'

import style from "./strayBar.module.css"
import React, { useState, useEffect } from "react";
import fetchAnimalInfo from "@/app/_api/fetchAnimalInfo";
import { parseStringPromise } from "xml2js";

export default function StrayBar() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [gunguData, setGunguData] = useState<any[]>([]);
  const [uprCd, setUprCd] = useState<string | null>(null);

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedLocation(value);
    console.log("위치:", value);
    if (value !== "모두") {
      setUprCd(value);
    }
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedType(value);
    console.log("타입:", value);
    fetchAnimalInfo(value, selectedLocation);
  };

  // 시군구 데이터 가져오기
  const fetchGunguData = async (uprCd: string): Promise<void> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/abandonmentPublicSrvc/sigungu?upr_cd=${uprCd}&serviceKey=${process.env.NEXT_PUBLIC_API_SERVER_KEY}`,
      { cache: 'force-cache' } // 캐시 사용을 강제
    );
    const text = await response.text();
    try {
      const jsonData = await parseStringPromise(text);
      console.log("응답 데이터:", jsonData);
      const gunguList = jsonData?.response?.body[0]?.items[0]?.item || [];
      console.log("gunguList:", gunguList);
      setGunguData(gunguList);
    } catch (error) {
      console.error("데이터 파싱 오류:", error);
    }
  };

  useEffect(() => {
    if (uprCd) {
      fetchGunguData(uprCd);
    }
  }, [uprCd]);

  return (
    <div className={style.filterContainer}>
      <div className={style.where}>
        <p>위치</p>
        <select
          onChange={handleLocationChange}
          value={selectedLocation}
        >
          <option value="모두">모두</option>
          <option value="6110000">서울특별시</option>
          <option value="6260000">부산광역시</option>
          <option value="6270000">대구광역시</option>
          <option value="6280000">인천광역시</option>
          <option value="6290000">광주광역시</option>
          <option value="5690000">세종특별자치시</option>
          <option value="6300000">대전광역시</option>
        </select>
      </div>
      <div className={style.where}>
        <p>군구 조회</p>
        <select>
          <option value="모두">모두</option>
          {Array.isArray(gunguData) && gunguData.length > 0 ? (
            gunguData.map((gungu: any, index: number) => (
              <option key={index} value={gungu.code}>{gungu.orgdownNm}</option>
            ))
          ) : (
            <option>군구 정보가 없습니다.</option>
          )}
        </select>
      </div>
      <div className={style.select}>
        <p>종류</p>
        <select
          onChange={handleTypeChange}
          value={selectedType}
        >
          <option value="all">모두</option>
          <option value="417000">개</option>
          <option value="422400">고양이</option>
          <option value="429900">기타</option>
        </select>
      </div>
    </div>
  );
}