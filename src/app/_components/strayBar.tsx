import style from "./strayBar.module.css"

export default function StrayBar() {
  return (
      <div className={style.filterContainer}>
        <div className={style.date}>
          <p>날짜</p>
          <input type="date"/>
        </div>
        <div className={style.where}>
          <p>위치</p>
          <select>
            <option value="진량">경산</option>
            <option value="사동">사동</option>
            <option value="옥곡">옥곡</option>
            <option value="정평">정평</option>
          </select>
        </div>
        <div className={style.select}>
          <p>종류</p>
          <select>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="more">More</option>
          </select>
        </div>
      </div>
  )
}