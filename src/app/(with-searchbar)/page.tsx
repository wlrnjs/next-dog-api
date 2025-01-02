import styles from "./page.module.css";
import Input from "@/app/_components/input";
import React from "react";
import ItemComponent from "@/app/(with-searchbar)/_components/itemComponent";

export default function Home() {

  return (
    <>
      <div className={styles.box}>
        <span>Home,</span>
        <span>Find a pet,</span>
        <span>“Adoption changes lives—your love makes a difference.”</span>
        <span>“Give a homeless dog a chance for a new life.”</span>
        <span>“Bring hope and love to a rescued pup.”</span>
        <Input />
      </div>

      <div className={styles.dogBox}>
        <div className={styles.p}>
          <span>🐾🐾</span>
          <span>새로 들어온 아이들</span>
        </div>
        <div className={styles.item}>
          <ItemComponent />
        </div>
      </div>
    </>
  );
}