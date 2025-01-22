"use client"

import React from 'react';
import style from './password.module.css';
import {useRouter} from "next/navigation";

const Page = () => {
  const router = useRouter();

  const back = () => {
    router.back()
  }

  return (
    <div className={style.container}>
      <div className={style.box}>
        <h3 onClick={back}>&lt;</h3>
        <h1 className={style.title}>비밀번호 찾기</h1>
        <p className={style.description}>가입 시 등록한 이메일 주소를 입력해주세요. <br/> 임시 비밀번호를 이메일로 발송해 드립니다.</p>
        <form className={style.form}>
          <input
            className={style.input}
            type="email"
            placeholder="이메일 입력"
          />
          <button className={style.button}>비밀번호 찾기</button>
        </form>
      </div>
    </div>
  );
};

export default Page;