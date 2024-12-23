import { parseStringPromise } from "xml2js";

interface AnimalData {
  popfile: string[];
  name: string[];
  age: string[];
  kindCd: string[];
  colorCd: string[];
  sexCd: string[];
  neuterYn: string[];
  specialMark: string[];
  noticeNo: string[];
  desertionNo: string[];
}

export default async function fetchAnimal(desertionNo: string): Promise<AnimalData[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/abandonmentPublicSrvc/abandonmentPublic?bgnde=20241101&desertionNo=${desertionNo}&numOfRows=1&serviceKey=${process.env.NEXT_PUBLIC_API_SERVER_KEY}`
  );

  const text: string = await response.text();
  const jsonData = await parseStringPromise(text); // xml -> json

  if (
    jsonData.OpenAPI_ServiceResponse &&
    jsonData.OpenAPI_ServiceResponse.cmmMsgHeader &&
    jsonData.OpenAPI_ServiceResponse.cmmMsgHeader[0].errMsg
  ) {
    throw new Error(
      `API Error: ${jsonData.OpenAPI_ServiceResponse.cmmMsgHeader[0].errMsg}`
    );
  }

  return jsonData.response.body[0].items[0].item as AnimalData[];
}