import {parseStringPromise} from "xml2js";

export default async function fetchTestData() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/abandonmentPublicSrvc/abandonmentPublic?bgnde=20241101&pageNo=5&upr_cd=6110000&org_cd=3220000&numOfRows=18&totalCount=90&serviceKey=${process.env.NEXT_PUBLIC_API_SERVER_KEY}`
  )

  const text = await response.text();
  const jsonData = await parseStringPromise(text);

  if (!jsonData) {
    console.log("jsonData 가 비어있습니다.")
  }

  console.log("테스트데이터:", jsonData);
  return jsonData;
}