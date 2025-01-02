import {parseStringPromise} from "xml2js";

export default async function fetchCenterData() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/abandonmentPublicSrvc/shelter?upr_cd=6110000&org_cd=3220000&serviceKey=${process.env.NEXT_PUBLIC_API_SERVER_KEY}`
  )

  const text: string = await response.text();
  const jsonData = await parseStringPromise(text);

  if (!jsonData) {
    console.warn('Could not fetch center data', jsonData);
  }

  return jsonData;
}