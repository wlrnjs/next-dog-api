"use client"

import style from "./login-page.module.css";
import React from "react";
import {useRouter} from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  const searchToId = () => {
    router.push("/search_id")
  }

  const searchToPassword = () => {
    router.push("/search_password")
  }

  const join = () => {
    router.push("/join")
  }

  return (
    <div className={style.container}>
      <div className={style.box}>
        <form className={style.form} action="">
          <input className={style.input} type="text" placeholder="아이디"/>
          <input className={style.input} type="password" placeholder="비밀번호"/>
          <button className={style.button}>로그인</button>
        </form>
        <div className={style.search}>
          <h6 onClick={searchToId}>아이디 찾기</h6>
          <h6 onClick={searchToPassword}>비밀번호 찾기</h6>
          <h6 onClick={join}>회원가입</h6>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;