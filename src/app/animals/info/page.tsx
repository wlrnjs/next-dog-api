"use client"

import React from 'react';
import style from "./idPage.module.css";
import {ReadonlyURLSearchParams, useSearchParams} from "next/navigation";
import ImgBox from "@/app/animals/info/_component/imgBox";
import InfoBox from "@/app/animals/info/_component/infoBox";

const Page = () => {
  const searchParams: ReadonlyURLSearchParams = useSearchParams()
  const q: string | null = searchParams.get("q");
  console.log("desertionNo", q);

  return (
      <div className={style.container}>
        <ImgBox q={q}/>
        <InfoBox q={q}/>
      </div>
  );
};

export default Page;