import style from "./strayBar.module.css";
import React, {useState, useEffect} from "react";
import {parseStringPromise} from "xml2js";

export default function StrayBar({onFilterChange}: {
  onFilterChange: (bgnde: string, endde: string, location: string, type: string, uprData: string) => void;
}) {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedUprData, setSelectedUprData] = useState("");
  const [selectedBgnde, setSelectedBgnde] = useState("");
  const [selectedEndde, setSelectedEndde] = useState("");
  const [gunguData, setGunguData] = useState<any[]>([]);
  const [uprCd, setUprCd] = useState<string | null>(null);

  // 지역변경
  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedLocation(value);
    if (value !== "모두") {
      setUprCd(value);
    }
  };

  // 종류변경
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  // 군구변경
  const handleUprDataChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUprData(event.target.value);
  };

  // 날짜 값 하이폰 제거
  const removeHyphensFromDate = (date: string) => {
    return date.replace(/-/g, '');
  }

  // 시작일 변경
  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const startDate = removeHyphensFromDate(event.target.value);
    setSelectedBgnde(startDate);
    console.log(startDate);
  }

  // 종료일 변경
  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const endDate = removeHyphensFromDate(event.target.value);
    setSelectedEndde(endDate);
    console.log(endDate);
  }

  // 군구 조회 api
  const fetchGunguData = async (uprCd: string): Promise<void> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/abandonmentPublicSrvc/sigungu?upr_cd=${uprCd}&serviceKey=${process.env.NEXT_PUBLIC_API_SERVER_KEY}`,
      {cache: "force-cache"}
    );
    const text = await response.text();
    const jsonData = await parseStringPromise(text);
    const gunguList = jsonData?.response?.body[0]?.items[0]?.item || [];
    setGunguData(gunguList);
    console.log(gunguList);
  };

  // uprCd가 바뀔때 마다 api 변경
  useEffect(() => {
    if (uprCd) {
      fetchGunguData(uprCd);
    }
  }, [uprCd]);

  const onClick = () => {
    if (!selectedLocation || !selectedType || !selectedUprData) {
      alert("위치, 군구 조회, 종류를 확인하세요");
    } else {
      console.log("공고시작일:", selectedBgnde, "공고종료일:",selectedEndde, "위치:", selectedLocation, "타입:", selectedType, "군구:", selectedUprData);
      onFilterChange(selectedBgnde, selectedEndde ,selectedLocation, selectedType, selectedUprData);
    }
  };

  return (
    <div className={style.filterContainer}>
      <div className={style.date}>
        <p>시작일</p>
        <input type="date" onChange={handleStartDateChange}/>
      </div>
      <div className={style.date}>
        <p>종료일</p>
        <input type="date" onChange={handleEndDateChange}/>
      </div>

      <div className={style.where}>
        <p>위치</p>
        <select onChange={handleLocationChange} value={selectedLocation}>
          <option value="모두">모두</option>
          <option value="6110000">서울특별시</option>
          <option value="6260000">부산광역시</option>
          <option value="6270000">대구광역시</option>
          <option value="6280000">인천광역시</option>
          <option value="6290000">광주광역시</option>
          <option value="5690000">세종특별자치시</option>
          <option value="6300000">대전광역시</option>
        </select>
      </div>
      <div className={style.where}>
        <p>군구 조회</p>
        <select value={selectedUprData} onChange={handleUprDataChange}>
          <option value="모두">모두</option>
          {Array.isArray(gunguData) && gunguData.length > 0 ? (
            gunguData.map((gungu: any, index: number) => (
              <option key={index} value={gungu.orgCd}>
                {gungu.orgdownNm}
              </option>
            ))
          ) : (
            <option>군구 정보가 없습니다.</option>
          )}
        </select>
      </div>
      <div className={style.select}>
        <p>종류</p>
        <select onChange={handleTypeChange} value={selectedType}>
          <option value="all">모두</option>
          <option value="417000">개</option>
          <option value="422400">고양이</option>
          <option value="429900">기타</option>
        </select>
      </div>
      <button className={style.btn} onClick={onClick}>검색</button>
    </div>
  );
}