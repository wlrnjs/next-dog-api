"use client";

import { useEffect } from "react";
import Image from "next/image";
import style from "./dogBox.module.css";
import { parseStringPromise } from "xml2js";

// const apiKey = "sePRmtaVLs6dv%2Fb7C0Ca6BEdv3W1A%2FZSBvWtRWLYNHWAF7b4OjPaO2g7y%2Bh6f7VPluCusoFa8h%2BAHrWWhMQ1g%3D%3D";

export async function animalData() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/abandonmentPublicSrvc/abandonmentPublic?bgnde=20211201&endde=20211231&pageNo=1&numOfRows=10&serviceKey=${process.env.NEXT_PUBLIC_API_SERVER_KEY}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const text = await response.text();
  console.log("Raw response:", text); // XML 데이터 호출

  // XML 데이터를 JSON으로 변환
  try {
    const jsonData = await parseStringPromise(text);
    console.log("Parsed JSON data:", jsonData);
    return jsonData; // JSON 데이터 반환
  } catch (err) {
    console.error("Error parsing XML to JSON:", err);
    throw err;
  }
}

export default function DogBox() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const animals = await animalData(); // JSON 데이터 호출
        console.log("Fetched animal data:", animals); // JSON 데이터 출력
      } catch (error) {
        console.error("Error fetching animal data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={style.container}>
      <Image
        alt="avatar.img"
        src={"/avatar.png"}
        className={style.img}
        width={256}
        height={159}
      />
      <h3>name</h3>
      <p>male</p>
    </div>
  );
}