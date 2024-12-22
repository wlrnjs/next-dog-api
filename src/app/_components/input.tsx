import style from "./input.module.css"

export default function Input() {
  return (
    <div className={style.container}>
      <input className={style.input} type="text" placeholder="search your friends" maxLength={20}/>
      <button className={style.button}>Search</button>
    </div>
  )
}