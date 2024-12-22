import Image from "next/image";
import style from "./dogBox.module.css";
import {AnimalTypes} from "@/types";

export default function DogBox({filename, age, kindCd} : AnimalTypes) {
  return (
    <div className={style.container}>
      <Image
        alt="Animal Image"
        src={filename[0]}
        className={style.img}
        width={256}
        height={159}
        layout="fixed"
      />
      <h3>{kindCd[0]}</h3>
      <p>{age[0]}</p>
    </div>
  );
}