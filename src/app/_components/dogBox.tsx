import Image from "next/image";
import style from "./dogBox.module.css"

export default function DogBox() {
  return (
    <div className={style.container}>
      <Image
        alt="avatar.img"
        src={"/avatar.png"}
        className={style.img}
        width={256}
        height={159}
      />
      <h3>name</h3>
      <p>male</p>
    </div>
  )
}