"use client"

import React, {useEffect, useState} from 'react';
import style from "./itemComponent.module.css"
import AnimalItemBox from "@/app/(with-searchbar)/_components/animalItemBox";
import {AnimalTypes} from "@/types";
import {useRouter} from "next/navigation";
import fetchMainData from "@/app/_api/fetchMainData";
import SkeletonContainer from "@/app/_components/skeleton/skeletonContainer";
import ContainerBox from "@/app/_components/containerBox";

const ItemComponent = () => {
  const [data, setData] = useState<AnimalTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMainData();
        setData(data);
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
    return <SkeletonContainer />;
  }

  if (!data || data.length === 0) {
    return <ContainerBox title="No animals found." />;
  }

  const onClick = (desertionNo: string) => {
    router.push(`/animals/info?q=${desertionNo}`);
  }

  return (
    <div className={style.container}>
      <button className={style.button}> {"<"} </button>
      {data.map((animal: AnimalTypes, index: number) => (
        <AnimalItemBox
          key={index}
          desertionNo={animal.desertionNo[0]}
          popfile={animal.popfile}
          age={animal.age}
          kindCd={animal.kindCd}
          onClick={onClick}
        />
      ))}
      <button className={style.button}> {">"} </button>
    </div>
  );
};

export default ItemComponent;