import React from 'react';
import style from "./infoBox.module.css";

const InfoBox = () => {
  const animalInfo = {
    noticeNo: "공고번호",
    desertionNo: "유기번호",
    kindCd: "품종",
    colorCd: "털색",
    sexCd: "성별",
    neuterYn: "중성화",
    specialMark: "특이사항",
  };

  const structureInfo = {
    happenPlace: "발견장소",
    noticeSdt: "공고시작일",
    noticeEdt: "공고종료일",
  };

  const centerInfo = {
    careNm: "보호소이름",
    careAddr: "보호소주소",
    careTel: "보호소전화번호",
    chargeNm: "담당자",
    officetel: "담당자번호",
  };

  return (
    <div className={style.container}>
      <h3 className={style.title}>
        <span role="img" aria-label="paw">
          🐾
        </span>
        동물의 정보
      </h3>
      <table className={style.table}>
        <tbody>
        {Object.entries(animalInfo).map(([key, value]) => (
          <tr key={key}>
            <th>{key}</th>
            <td>{value}</td>
          </tr>
        ))}
        </tbody>
      </table>

      <h3 className={style.title}>
        <span role="img" aria-label="paw">
          🏠
        </span>
        구조 정보
      </h3>
      <table className={style.table}>
        <tbody>
        {Object.entries(structureInfo).map(([key, value]) => (
          <tr key={key}>
            <th>{key}</th>
            <td>{value}</td>
          </tr>
        ))}
        </tbody>
      </table>

      <h3 className={style.title}>
        <span role="img" aria-label="paw">
          📍
        </span>
        동물보호센터 안내
      </h3>
      <table className={style.table}>
        <tbody>
        {Object.entries(centerInfo).map(([key, value]) => (
          <tr key={key}>
            <th>{key}</th>
            <td>{value}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default InfoBox;