import React from 'react';
import style from "./container.module.css"
import LostFoundNav from "@/app/lost-found/_component/lostFoundNav";

const Container = () => {
  return (
    <div className={style.container}>
      <div className={style.box}>
        <LostFoundNav/>
      </div>
    </div>
  );
};

export default Container;