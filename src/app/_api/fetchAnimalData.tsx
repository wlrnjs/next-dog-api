import {parseStringPromise} from "xml2js";

// API 데이터를 가져오는 함수
export default async function fetchAnimalData() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/abandonmentPublicSrvc/abandonmentPublic?bgnde=20241101&pageNo=1&numOfRows=18&serviceKey=${process.env.NEXT_PUBLIC_API_SERVER_KEY}`
  );

  const text = await response.text();
  const jsonData = await parseStringPromise(text);

  // 에러 처리
  if (
    jsonData.OpenAPI_ServiceResponse &&
    jsonData.OpenAPI_ServiceResponse.cmmMsgHeader &&
    jsonData.OpenAPI_ServiceResponse.cmmMsgHeader[0].errMsg
  ) {
    throw new Error(
      `API Error: ${jsonData.OpenAPI_ServiceResponse.cmmMsgHeader[0].errMsg}`
    );
  }

  return jsonData.response.body[0].items[0].item;
}
