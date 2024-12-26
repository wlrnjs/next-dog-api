"use client"

import Image from "next/image";
import style from "./dogBox.module.css";
import {AnimalTypes} from "@/types";

export default function DogBox({onClick, desertionNo, popfile, age, kindCd}: AnimalTypes & {
  onClick: (desertionNo: string[]) => void
}) {
  return (
    <div className={style.container} onClick={() => onClick(desertionNo)}>
      <Image
        alt="Animal Image"
        src={popfile[0]}
        className={style.img}
        width={256}
        height={159}
        priority
      />
      <h3>{kindCd[0]}</h3>
      <p>{age[0]}</p>
    </div>
  );
}