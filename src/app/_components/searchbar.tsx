import style from "./searchbar.module.css"
import Link from "next/link";

export default function Searchbar() {
  return (
    <div className={style.container}>
      <Link href={"/"}>
        <div>로고이미지</div>
      </Link>
      <div className={style.nav}>
        <Link style={{cursor:"pointer"}} href={"/"}>Home</Link>
        <Link style={{cursor:"pointer"}} href={"/animals"}>Stray Animals</Link>
        <Link style={{cursor:"pointer"}} href={"/shelters"}>Animal Shelters</Link>
        <Link style={{cursor:"pointer"}} href={"/lost-found"}>Lost & Found</Link>
        <Link style={{cursor:"pointer"}} href={"/about"}>About</Link>
      </div>
      <div className={style.buttonItem}>
        <input type="checkbox" id="darkmode-toggle" className={style.input}/>
        <label htmlFor="darkmode-toggle" className={style.label}></label>
        <div className={style.background}></div>
        <div className={style.log}>Logout</div>
      </div>
    </div>
  )
}