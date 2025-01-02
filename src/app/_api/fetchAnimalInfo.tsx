import { parseStringPromise } from "xml2js";
import AnimalData from "@/types";

export default async function fetchAnimalInfo(q: string): Promise<AnimalData[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/abandonmentPublicSrvc/abandonmentPublic?bgnde=20241101&pageNo=5&numOfRows=18&serviceKey=${process.env.NEXT_PUBLIC_API_SERVER_KEY}`
  );

  const text: string = await response.text();
  const jsonData = await parseStringPromise(text); // xml -> json
  console.log('Parsed JSON data:', jsonData); // 파싱된 JSON 데이터 로그

  if (
    jsonData.OpenAPI_ServiceResponse &&
    jsonData.OpenAPI_ServiceResponse.cmmMsgHeader &&
    jsonData.OpenAPI_ServiceResponse.cmmMsgHeader[0].errMsg
  ) {
    throw new Error(
      `API Error: ${jsonData.OpenAPI_ServiceResponse.cmmMsgHeader[0].errMsg}`
    );
  }

  console.log('jsonData:', jsonData); // 응답 데이터 출력

  const filteredData: AnimalData[] = (jsonData.response.body[0].items[0].item as AnimalData[]).filter(
    (animal) => animal.desertionNo[0] === q
  );

  return filteredData;
}