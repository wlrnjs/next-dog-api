"use client";

import StrayBar from "@/app/_components/strayBar";
import style from "./animals-page.module.css";
import DogBox from "@/app/_components/dogBox";
import {useEffect, useState} from "react";
import {AnimalTypes} from "@/types";
import {parseStringPromise} from "xml2js";
import ContainerBox from "@/app/_components/containerBox";
import SkeletonContainer from "@/app/_components/skeleton/skeletonContainer";

// API 데이터를 가져오는 함수
async function fetchAnimalData() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/abandonmentPublicSrvc/abandonmentPublic?bgnde=20241101&pageNo=1&numOfRows=18&serviceKey=${process.env.NEXT_PUBLIC_API_SERVER_KEY}`
  );

  const text = await response.text();
  const jsonData = await parseStringPromise(text);

  // 에러 처리
  if (
    jsonData.OpenAPI_ServiceResponse &&
    jsonData.OpenAPI_ServiceResponse.cmmMsgHeader &&
    jsonData.OpenAPI_ServiceResponse.cmmMsgHeader[0].errMsg
  ) {
    throw new Error(
      `API Error: ${jsonData.OpenAPI_ServiceResponse.cmmMsgHeader[0].errMsg}`
    );
  }

  return jsonData.response.body[0].items[0].item;
}

export default function Page() {
  const [animals, setAnimals] = useState<AnimalTypes[]>([]); // 상태로 API 데이터 관리
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 관리

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAnimalData();
        setAnimals(data); // 데이터를 상태로 저장
        setLoading(false); // 로딩 상태 업데이트
        console.log(data);
      } catch (error) {
        console.error("Error fetching animal data:", error);
        setLoading(false); // 에러가 발생해도 로딩 중단
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <SkeletonContainer/>;
  }

  if (!animals || animals.length === 0) {
    return <ContainerBox title='No animals found.' />;
  }

  return (
    <>
      <StrayBar/>
      <div className={style.boxContainer}>
        {animals.map((animal, index) => (
          <DogBox key={index}
                  {...animal}
          />
        ))}
      </div>
    </>
  );
}