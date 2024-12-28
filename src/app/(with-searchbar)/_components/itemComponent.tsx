"use client"

import React from 'react';
import style from "./itemComponent.module.css"
import AnimalItemBox from "@/app/(with-searchbar)/_components/animalItemBox";

const ItemComponent = () => {
  return (
    <div className={style.container}>
      <button className={style.button}> {"<"} </button>
      <AnimalItemBox/>
      <AnimalItemBox/>
      <AnimalItemBox/>
      <AnimalItemBox/>
      <AnimalItemBox/>
      <button className={style.button}> {">"} </button>
    </div>
  );
};

export default ItemComponent;