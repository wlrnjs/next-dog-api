export default async function fetchGoogleData() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_GOOGLE_API_URL}?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
  )

  const json = await response.json();

  if(!json) {
    console.warn('Not Found', json);
  }
  console.log(json);
  return json;
}