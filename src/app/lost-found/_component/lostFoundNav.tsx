import React from 'react';
import style from "./lostFound.module.css"

const LostFoundNav = () => {
  return (
    <div className={style.nav}>
      <ul>
        <li>찾아요</li>
        <li>찾았어요</li>
        <li>글쓰기</li>
      </ul>
    </div>
  );
};

export default LostFoundNav;