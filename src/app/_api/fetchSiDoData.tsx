import {parseStringPromise} from "xml2js";

export default async function fetchSiDoData() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/abandonmentPublicSrvc/sido?numOfRows=7&pageNo=1&serviceKey=${process.env.NEXT_PUBLIC_API_SERVER_KEY}`,
  )
  const text = await response.text();
  const jsonData = await parseStringPromise(text);

  if (!jsonData) {
    console.log("jsonData 가 비어있습니다.");
  }

  console.log("시도조회 데이터: ", jsonData);
  return jsonData;
}