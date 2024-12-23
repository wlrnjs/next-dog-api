import React from 'react';
import style from "./skeleton.module.css"

const SkeletonItem = () => {
  return (
    <div className={style.container}>
      <div className={style.imgBox}/>
      <div className={style.titleBox}/>
      <div className={style.pBox}/>
    </div>
  );
};

export default SkeletonItem;