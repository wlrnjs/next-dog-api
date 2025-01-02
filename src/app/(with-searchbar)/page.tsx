"use client";

import styles from "./page.module.css"; // CSS 모듈 가져오기
import Input from "@/app/_components/input";
import ReactPaginate from "react-paginate";
import React, { useState } from "react";
import ItemComponent from "@/app/(with-searchbar)/_components/itemComponent";

export default function Home() {
  const totalItems = 25; // 총 데이터 개수
  const itemsPerPage = 5; // 한 페이지당 보여줄 데이터 개수
  const pageCount = Math.ceil(totalItems / itemsPerPage); // 총 페이지 수
  const [page, setPage] = useState(1);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
  };

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
          <span>공고 기한이 얼마남지 않은</span>
        </div>
        <div className={styles.item}>
          <ItemComponent />
          <div className={styles.reactPaginate}>
            <ReactPaginate
              nextLabel="Next >"
              onPageChange={handlePageChange}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount || 0}
              previousLabel="< Previous"
              pageClassName={styles.pageItem}
              pageLinkClassName={styles.pageLink}
              previousClassName={styles.pageItem}
              previousLinkClassName={styles.pageLink}
              nextClassName={styles.pageItem}
              nextLinkClassName={styles.pageLink}
              breakLabel="..."
              breakClassName={styles.breakItem}
              breakLinkClassName={styles.pageLink}
              containerClassName={styles.reactPaginate}
              activeClassName={styles.activePage}
              disabledClassName={styles.disabledPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}