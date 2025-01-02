"use client";

import StrayBar from "@/app/_components/strayBar";
import style from "./animals-page.module.css";
import DogBox from "@/app/_components/dogBox";
import {useEffect, useState} from "react";
import {AnimalTypes} from "@/types";
import ContainerBox from "@/app/_components/containerBox";
import SkeletonContainer from "@/app/_components/skeleton/skeletonContainer";
import fetchAnimalData from "@/app/_api/fetchAnimalData";
import {useRouter} from "next/navigation";
import Paginate from "@/app/animals/info/_component/paginate";

export default function Page() {
  const [animals, setAnimals] = useState<AnimalTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

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