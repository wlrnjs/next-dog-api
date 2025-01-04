"use client";

import StrayBar from "@/app/_components/strayBar";
import style from "./animals-page.module.css";
import DogBox from "@/app/_components/dogBox";
import { useEffect, useState } from "react";
import { AnimalTypes } from "@/types";
import ContainerBox from "@/app/_components/containerBox";
import SkeletonContainer from "@/app/_components/skeleton/skeletonContainer";
import { useRouter } from "next/navigation";
import Paginate from "@/app/animals/info/_component/paginate";
import { parseStringPromise } from "xml2js";

export default function Page() {
  const [animals, setAnimals] = useState<AnimalTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState({
    bgnde: "",
    endde: "",
    location: "",
    type: "",
    uprData: "",
  });
  const router = useRouter();

  // API URL 생성 함수
  const createApiUrl = () => {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/abandonmentPublicSrvc/abandonmentPublic`;
    const defaultParams = `?bgnde=20220101&pageNo=5&numOfRows=18&totalCount=90&serviceKey=${process.env.NEXT_PUBLIC_API_SERVER_KEY}`;

    const changeParams = `?pageNo=5&numOfRows=18&totalCount=90&serviceKey=${process.env.NEXT_PUBLIC_API_SERVER_KEY}`;

    // 필터에 따라 동적 쿼리 생성
    const queryParams = [];
    if (filters.bgnde) queryParams.push(`bgnde=${filters.bgnde}`);
    if (filters.endde) queryParams.push(`endde=${filters.endde}`);
    if (filters.location) queryParams.push(`upr_cd=${filters.location}`);
    if (filters.uprData) queryParams.push(`org_cd=${filters.uprData}`);
    if (filters.type) queryParams.push(`upkind=${filters.type}`);

    return queryParams.length > 0
      ? `${baseUrl}${changeParams}&${queryParams.join("&")}`
      : `${baseUrl}${defaultParams}`;
  };

  // 필터 변경 시 상태 업데이트
  const handleFilterChange = (bgnde: string, endde: string, location: string, type: string, uprData: string) => {
    setFilters({ bgnde, endde,location, type, uprData });
    console.log("필터 업데이트:", { bgnde, endde, location, type, uprData });
  };

  // 데이터 fetch 함수
  const fetchAnimalData = async () => {
    try {
      setLoading(true); // 로딩 상태 활성화
      const apiUrl = createApiUrl();
      const response = await fetch(apiUrl);
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

      const items = jsonData.response.body[0].items[0].item || [];
      setAnimals(items);
    } catch (error) {
      console.error("Error fetching animal data:", error);
    } finally {
      setLoading(false); // 로딩 상태 비활성화
    }
  };

  // 필터 변경 시 데이터 다시 가져오기
  useEffect(() => {
    fetchAnimalData();
  }, [filters]);

  if (loading) {
    return <SkeletonContainer />;
  }

  if (!animals || animals.length === 0) {
    return <ContainerBox title="No animals found." />;
  }

  return (
    <>
      <StrayBar onFilterChange={handleFilterChange} />
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
      <Paginate />
    </>
  );
}