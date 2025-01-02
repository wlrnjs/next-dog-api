"use client"

import React, { useEffect, useState } from 'react';
import style from "./itemComponent.module.css"
import AnimalItemBox from "@/app/(with-searchbar)/_components/animalItemBox";
import { AnimalTypes } from "@/types";
import { useRouter } from "next/navigation";
import ContainerBox from "@/app/_components/containerBox";
import SkeletonMainBox from "@/app/(with-searchbar)/_components/skeletonBox/skeletonMainBox";
import fetchAnimalData from "@/app/_api/fetchAnimalData";
import styles from "@/app/(with-searchbar)/page.module.css";
import ReactPaginate from "react-paginate";

const ItemComponent = () => {
  const [data, setData] = useState<AnimalTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const totalItems = 18; // 총 데이터 개수
  const itemsPerPage = 5; // 한 페이지당 보여줄 데이터 개수
  const pageCount = Math.ceil(totalItems / itemsPerPage); // 총 페이지 수
  const [page, setPage] = useState(1); // 현재 페이지 상태

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1); // 페이지 변경
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAnimalData();
        setData(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching animal data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <SkeletonMainBox />;
  }

  if (!data || data.length === 0) {
    return <ContainerBox title="No animals found." />;
  }

  // 페이지에 맞는 데이터 범위 계산
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;
  const currentPageData = data.slice(startIndex, endIndex);

  const onClick = (desertionNo: string) => {
    router.push(`/animals/info?q=${desertionNo}`);
  };

  return (
    <div className={style.container}>
      <div className={style.box}>
        {currentPageData.map((animal: AnimalTypes, index: number) => (
          <AnimalItemBox
            key={index}
            desertionNo={animal.desertionNo[0]}
            popfile={animal.popfile}
            age={animal.age}
            kindCd={animal.kindCd}
            onClick={onClick}
          />
        ))}
      </div>
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
  );
};

export default ItemComponent;