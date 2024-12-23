"use client";

import React, { useEffect, useState } from 'react';
import style from "./imgBox.module.css";
import fetchAnimal from "@/app/_api/fetchAnimal";
import Image from "next/image";

interface AnimalData {
  popfile: string[];
  name: string[];
  age: string[];
}

const ImgBox = () => {
  const [animalData, setAnimalData] = useState<AnimalData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: AnimalData[] = await fetchAnimal("someDesertionNo");
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