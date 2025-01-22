"use client"

import React from 'react';
import style from './signup.module.css';
import {useRouter} from "next/navigation";

const SignupPage = () => {
  const router = useRouter();

  const back = () => {
    router.back()
  }

  return (
    <div className={style.container}>
      <div className={style.box}>
        <h3 onClick={back}>&lt;</h3>
        <h1 className={style.title}>회원가입</h1>
        <p className={style.description}>간단한 정보를 입력하고 회원가입하세요.</p>
        <form className={style.form}>
          <input className={style.input} type="text" placeholder="이름"/>
          <input className={style.input} type="email" placeholder="이메일"/>
          <input className={style.input} type="password" placeholder="비밀번호"/>
          <input className={style.input} type="password" placeholder="비밀번호 확인"/>
          <button className={style.button}>회원가입</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;