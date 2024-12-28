import React from 'react';
import style from "./animalItemBox.module.css"
import Image from "next/image"

const AnimalItemBox = () => {
  return (
    <div className={style.container}>
      <Image
        src="/avatar.png" alt="이미지"
        width={45} height={45}
        className={style.image} />
      <div className={style.info}>
        <h3>title</h3>
        <p>0000년도</p>
      </div>
    </div>
  );
};

export default AnimalItemBox;