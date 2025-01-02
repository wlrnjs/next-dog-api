"use client";

import React, { useEffect, useState } from "react";
import style from "./imgBox.module.css";
import fetchAnimalInfo from "@/app/_api/fetchAnimalInfo";
import Image from "next/image";
import queryType from "@/queryType";
import AnimalData from "@/animalDataTypes";

const ImgBox: React.FC<queryType> = ({ q }: queryType) => {
  const [animalData, setAnimalData] = useState<AnimalData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const data: AnimalData[] = await fetchAnimalInfo(q);
        console.log("imgData:", data);
        if (data.length > 0) {
          setAnimalData(data[0]);
        } else {
          console.warn("No data found for the given query.");
        }
      } catch (error) {
        console.error("Error fetching animal data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [q]);

  console.log("animalData:", animalData);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!animalData || !animalData.popfile || animalData.popfile.length === 0) {
    return <h1>잘못된 요청입니다.</h1>;
  }

  return (
    <Image
      src={animalData.popfile[0]}
      alt="Animal image"
      className={style.imgBox}
      width={200}
      height={200}
    />
  );
};

export default ImgBox;