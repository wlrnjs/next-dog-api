"use client";

import React, { useEffect, useState } from "react";
import style from "./infoBox.module.css";
import fetchAnimal from "@/app/_api/fetchAnimal";
import AnimalData from "@/animalInfo";

const InfoBox = () => {
  const [animalData, setAnimalData] = useState<AnimalData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: AnimalData[] = await fetchAnimal("setAnimalData");
        setAnimalData(data[0]);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error("Error fetching animal data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!animalData) {
    return <h1>잘못된 요청입니다.</h1>;
  }

  const AnimalInfo = {
    공고번호: animalData.noticeNo?.[0] || "정보 없음",
    유기번호: animalData.desertionNo?.[0] || "정보 없음",
    품종: animalData.kindCd?.[0] || "정보 없음",
    털색: animalData.colorCd?.[0] || "정보 없음",
    성별: animalData.sexCd?.[0] === "F" ? "암컷" : "수컷",
    중성화: animalData.neuterYn?.[0] === "Y" ? "예" : "아니오",
    특이사항: animalData.specialMark?.[0] || "정보 없음",
  };

  return (
    <div className={style.container}>
      <h3 className={style.title}>
        <span role="img" aria-label="paw">
          🐾
        </span>
        동물의 정보
      </h3>
      <table className={style.table}>
        <tbody>
        {Object.entries(AnimalInfo).map(([key, value]) => (
          <tr key={key}>
            <th>{key}</th>
            <td>{value}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default InfoBox;