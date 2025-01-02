"use client";

import React, {useEffect, useState} from "react";
import style from "./infoBox.module.css";
import fetchAnimalInfo from "@/app/_api/fetchAnimalInfo";
import AnimalData from "@/animalInfo";

const InfoBox = ({q}: { q: string[] }) => {
  const [animalData, setAnimalData] = useState<AnimalData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: AnimalData = await fetchAnimalInfo(q);
        console.log("q:", q);
        console.log("Fetched data:", data);
        setAnimalData(data[0]);
      } catch (error) {
        console.error("Error fetching animal data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [q]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!animalData) {
    return <h1>잘못된 요청입니다.</h1>;
  }

  function changeDate(date: string): string {
    if (date.length !== 8) {
      return "날짜 형식 오류";
    }

    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);

    return `${year}년 ${month}월 ${day}일`;
  }

  const publicNoticePeriod = (start?: string, end?: string) => {
    if (!start || !end) return "정보 없음";
    return `${changeDate(start)} ~ ${changeDate(end)}`;
  };

  const AnimalInfo = {
    품종: animalData.kindCd?.[0] || "정보 없음",
    체중: animalData.weight?.[0] || "정보 없음",
    털색: animalData.colorCd?.[0] || "정보 없음",
    나이: animalData.age?.[0] || "정보 없음",
    성별: animalData.sexCd?.[0] === "F" ? "암컷" : "수컷",
    중성화: animalData.neuterYn?.[0] === "Y" ? "예" : "아니오",
    특이사항: animalData.specialMark?.[0] || "정보 없음",
  };

  const AnimalRescue = {
    공고번호: animalData.noticeNo?.[0] || "정보 없음",
    유기번호: animalData.desertionNo?.[0] || "정보 없음",
    구조일: changeDate(animalData.happenDt?.[0]) || "정보 없음",
    구조사유: animalData.noticeNo?.[0] || "정보 없음",
    구조장소: animalData.happenPlace?.[0] || "정보 없음",
    상태: animalData.processState?.[0] || "정보 없음",
    공고일: publicNoticePeriod(animalData.noticeSdt?.[0], animalData.noticeEdt?.[0]),
  };

  const AnimalProtection = {
    보호센터명: animalData.careNm?.[0] || "정보 없음",
    담당자: animalData.chargeNm?.[0] || "정보 없음",
    주소: animalData.careAddr?.[0] || "정보 없음",
    전화번호: animalData.officetel?.[0] || "정보 없음",
  };

  return (
    <div className={style.container}>
      <div className={style.row}>
        <div className={style.infoBlock}>
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
        <div className={style.infoBlock}>
          <h3 className={style.title}>
            <span role="img" aria-label="paw">
              🐾
            </span>
            구조 정보
          </h3>
          <table className={style.table}>
            <tbody>
            {Object.entries(AnimalRescue).map(([key, value]) => (
              <tr key={key}>
                <th>{key}</th>
                <td>{value}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
      <h3 className={style.title}>
        <span role="img" aria-label="paw">
          🐾
        </span>
        동물보호센터 안내
      </h3>
      <table className={style.table}>
        <tbody>
        {Object.entries(AnimalProtection).map(([key, value]) => (
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