'use client'

import style from "./strayBar.module.css"
import {useState} from "react";
import fetchAnimalInfo from "@/app/_api/fetchAnimalInfo";

export default function StrayBar() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedLocation(value);
    console.log("위치:", value);  // 선택된 위치 값 출력
  };

  // Type 선택 시 실행되는 함수
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedType(value);
    console.log("타입:", value);
    fetchAnimalInfo(value);
  };

  return (
    <div className={style.filterContainer}>
      <div className={style.where}>
        <p>위치</p>
        <select
          onChange={handleLocationChange}
          value={selectedLocation}
        >
          <option value="진량">경산</option>
          <option value="사동">사동</option>
          <option value="옥곡">옥곡</option>
          <option value="정평">정평</option>
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
  )
}