import React from 'react';
import style from "./skeletonMainBox.module.css"

const SkeletonMainBox = () => {
  return (
    <div className={style.allContainer}>
      <div className={style.container}>
        <div className={style.img}/>
        <div className={style.box}>
          <div className={style.title}/>
          <div className={style.p}/>
        </div>
      </div>
      <div className={style.container}>
        <div className={style.img}/>
        <div className={style.box}>
          <div className={style.title}/>
          <div className={style.p}/>
        </div>
      </div>
      <div className={style.container}>
        <div className={style.img}/>
        <div className={style.box}>
          <div className={style.title}/>
          <div className={style.p}/>
        </div>
      </div>
      <div className={style.container}>
        <div className={style.img}/>
        <div className={style.box}>
          <div className={style.title}/>
          <div className={style.p}/>
        </div>
      </div>
      <div className={style.container}>
        <div className={style.img}/>
        <div className={style.box}>
          <div className={style.title}/>
          <div className={style.p}/>
        </div>
      </div>
    </div>
  );
};

export default SkeletonMainBox;