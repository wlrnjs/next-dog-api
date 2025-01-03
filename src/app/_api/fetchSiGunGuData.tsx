import {parseStringPromise} from "xml2js";

export default async function fetchSiGunGuData() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/abandonmentPublicSrvc/sigungu?upr_cd=6110000&serviceKey=${process.env.NEXT_PUBLIC_API_SERVER_KEY}`,
  )
  const text = await response.text();
  const jsonData = await parseStringPromise(text);

  if (!jsonData) {
    console.log("jsonData 가 비어있습니다.");
  }

  console.log("시군구조회 데이터: ", jsonData);
  return jsonData;
}