import Image from "next/image";
import style from "./dogBox.module.css";
import {AnimalTypes} from "@/types";
import {useRouter} from "next/navigation";

export default function DogBox({desertionNo, popfile, age, kindCd}: AnimalTypes) {
  const router = useRouter();

  const onClick = () => {
    router.push(`/animals/${desertionNo}`)
  }

  return (
    <div className={style.container} onClick={onClick}>
      <Image
        alt="Animal Image"
        src={popfile[0]}
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