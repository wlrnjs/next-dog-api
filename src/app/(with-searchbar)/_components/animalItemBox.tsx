import React from 'react';
import style from "./animalItemBox.module.css"
import Image from "next/image"

const AnimalItemBox = ({desertionNo, popfile, age, kindCd, onClick}) => {
  return (
    <div className={style.container} onClick={() => onClick(desertionNo)}>
      <Image
        src={popfile[0]}
        alt="이미지"
        width={245}
        height={245}
        className={style.image}
        priority
      />
      <div className={style.info}>
        <h3>{kindCd}</h3>
        <p>{age}</p>
      </div>
    </div>
  );
};

export default AnimalItemBox;