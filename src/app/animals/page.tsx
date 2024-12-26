"use client";

import StrayBar from "@/app/_components/strayBar";
import style from "./animals-page.module.css";
import DogBox from "@/app/_components/dogBox";
import { useEffect, useState } from "react";
import { AnimalTypes } from "@/types";
import ContainerBox from "@/app/_components/containerBox";
import SkeletonContainer from "@/app/_components/skeleton/skeletonContainer";
import fetchAnimalData from "@/app/_api/fetchAnimalData";
import { useRouter } from "next/navigation";

export default function Page() {
  const [animals, setAnimals] = useState<AnimalTypes[]>([]); // 상태로 API 데이터 관리
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 관리
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAnimalData();
        setAnimals(data); // 데이터를 상태로 저장
        setLoading(false); // 로딩 상태 업데이트
        console.log(data);
        return data;
      } catch (error) {
        console.error("Error fetching animal data:", error);
        setLoading(false); // 에러가 발생해도 로딩 중단
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <SkeletonContainer />;
  }

  if (!animals || animals.length === 0) {
    return <ContainerBox title="No animals found." />;
  }

  const onClick = (desertionNo: string) => {
    // /animals/info로 쿼리 파라미터를 추가하여 이동
    router.push(`/animals/info?q=${desertionNo}`);
  };

  return (
    <>
      <StrayBar />
      <div className={style.boxContainer}>
        {animals.map((animal: AnimalTypes, index: number) => (
          <DogBox
            key={index}
            desertionNo={animal.desertionNo[0]} // desertionNo를 props로 전달
            popfile={animal.popfile}
            age={animal.age}
            kindCd={animal.kindCd}
            onClick={onClick} // onClick 핸들러를 전달
          />
        ))}
      </div>
    </>
  );
}