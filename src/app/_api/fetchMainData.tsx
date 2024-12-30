import { parseStringPromise } from "xml2js";

export default async function fetchMainData() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/abandonmentPublicSrvc/abandonmentPublic?numOfRows=5&pageNo=5&serviceKey=${process.env.NEXT_PUBLIC_API_SERVER_KEY}`
  );

  const text: string = await response.text();
  const jsonData = await parseStringPromise(text);

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