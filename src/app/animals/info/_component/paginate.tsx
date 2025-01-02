import React, {useState} from 'react';
import style from "./paginate.module.css"
import ReactPaginate from "react-paginate";

const Paginate = () => {
  const totalItems = 90; // 총 데이터 개수
  const itemsPerPage = 18; // 한 페이지당 보여줄 데이터 개수
  const pageCount = Math.ceil(totalItems / itemsPerPage); // 총 페이지 수
  const [page, setPage] = useState(1); // 현재 페이지 상태

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1); // 페이지 변경
  };

  // 페이지에 맞는 데이터 범위 계산
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  return (
    <div className={style.reactPaginate}>
      <ReactPaginate
        onPageChange={handlePageChange}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount || 0}
        pageClassName={style.pageItem}
        pageLinkClassName={style.pageLink}
        previousClassName={style.pageItem}
        previousLinkClassName={style.pageLink}
        nextClassName={style.pageItem}
        nextLinkClassName={style.pageLink}
        breakLabel="..."
        breakClassName={style.breakItem}
        breakLinkClassName={style.pageLink}
        containerClassName={style.reactPaginate}
        activeClassName={style.activePage}
        disabledClassName={style.disabledPage}
      />
    </div>
  );
};

export default Paginate;