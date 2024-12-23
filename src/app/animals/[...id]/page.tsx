import React from 'react';
import style from "./idPage.module.css";
import InfoBox from "@/app/animals/[...id]/_component/infoBox";
import ImgBox from "@/app/animals/[...id]/_component/imgBox";

const Page = () => {
  return (
      <div className={style.container}>
        <ImgBox/>
        <InfoBox/>
      </div>
  );
};

export default Page;