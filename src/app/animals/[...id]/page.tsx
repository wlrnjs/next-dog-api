import React from 'react';
import style from "./idPage.module.css";
import ImgBox from "@/app/animals/[...id]/_component/imgBox";
import InfoBox from "@/app/animals/[...id]/_component/infoBox";

const Page = () => {

  return (
      <div className={style.container}>
        <ImgBox/>
        <InfoBox/>
      </div>
  );
};

export default Page;