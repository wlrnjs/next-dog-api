"use client"

import React, { useEffect, useState } from 'react';
import style from "./itemComponent.module.css"
import AnimalItemBox from "@/app/(with-searchbar)/_components/animalItemBox";
import { AnimalTypes } from "@/types";
import { useRouter } from "next/navigation";
import ContainerBox from "@/app/_components/containerBox";
import SkeletonMainBox from "@/app/(with-searchbar)/_components/skeletonBox/skeletonMainBox";
import fetchAnimalData from "@/app/_api/fetchAnimalData";

const ItemComponent = () => {
  const [data, setData] = useState<AnimalTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAnimalData();
        setData(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching animal data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <SkeletonMainBox />;
  }

  if (!data || data.length === 0) {
    return <ContainerBox title="No animals found." />;
  }

  const onClick = (desertionNo: string) => {
    router.push(`/animals/info?q=${desertionNo}`);
  };

  return (
    <div className={style.container}>
      <div className={style.box}>
        {data.slice(0, 5).map((animal: AnimalTypes, index: number) => (
          <AnimalItemBox
            key={index}
            desertionNo={animal.desertionNo[0]}
            popfile={animal.popfile}
            age={animal.age}
            kindCd={animal.kindCd}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemComponent;