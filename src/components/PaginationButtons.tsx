/* eslint-disable react/react-in-jsx-scope */

import { useMprPagination } from "../hooks/useMprPagination";
import s from "../styles/components/PaginationButtons.module.scss";
import leftArrow from "../assets/leftArrow.png";
import rightArrow from "../assets/rightArrow.png";

import classNames from "classnames/bind";
const cx = classNames.bind(s);

export const PaginationButtons = () => {
  const { totalPages, prev, next, currentPage } = useMprPagination();
  const pages = Array.from(Array(totalPages).keys());

  return (
    <div className={s.paginationContainer}>
      <div className={s.pagination}>
        <button
          className={s.button}
          onClick={prev}
          //   disabled={currentPage === 1}
        >
          <img src={leftArrow} alt="left arrow" />
        </button>
        <div className={s.pageNumbers}>
          {pages.map((page) => (
            <div key={page} className={s.pageNum}>
              {page + 1}
            </div>
          ))}
        </div>
        <button
          className={s.button}
          onClick={next}
          //   disabled={currentPage === totalPages}
        >
          <img src={rightArrow} alt="right arrow" />
        </button>
      </div>
    </div>
  );
};
