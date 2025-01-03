"use client";

import StrayBar from "@/app/_components/strayBar";
import style from "./animals-page.module.css";
import DogBox from "@/app/_components/dogBox";
import {useEffect, useState} from "react";
import {AnimalTypes} from "@/types";
import ContainerBox from "@/app/_components/containerBox";
import SkeletonContainer from "@/app/_components/skeleton/skeletonContainer";
import {useRouter} from "next/navigation";
import Paginate from "@/app/animals/info/_component/paginate";
import {parseStringPromise} from "xml2js";

export default function Page() {
  const [animals, setAnimals] = useState<AnimalTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // fetchAnimalData API 호출
  const fetchAnimalData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/abandonmentPublicSrvc/abandonmentPublic?bgnde=20241101&pageNo=5&numOfRows=18&totalCount=90&serviceKey=${process.env.NEXT_PUBLIC_API_SERVER_KEY}`
    );

    const text = await response.text();
    const jsonData = await parseStringPromise(text);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAnimalData();
        setAnimals(data);
        setLoading(false);
        return data;
      } catch (error) {
        console.error("Error fetching animal data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <SkeletonContainer/>;
  }

  if (!animals || animals.length === 0) {
    return <ContainerBox title="No animals found."/>;
  }

  return (
    <>
      <StrayBar/>
      <div className={style.boxContainer}>
        {animals.map((animal: AnimalTypes, index: number) => (
          <DogBox
            key={index}
            desertionNo={animal.desertionNo}
            popfile={animal.popfile}
            age={animal.age}
            kindCd={animal.kindCd}
            onClick={(desertionNo) => router.push(`/animals/info?q=${desertionNo}`)}
          />
        ))}
      </div>
      <Paginate/>
    </>
  );
}