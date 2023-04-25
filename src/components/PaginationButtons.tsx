/* eslint-disable react/react-in-jsx-scope */
import s from "../styles/components/PaginationButtons.module.scss";
import leftArrow from "../assets/leftArrow.png";
import rightArrow from "../assets/rightArrow.png";

import classNames from "classnames/bind";
const cx = classNames.bind(s);

type PaginationButtonsProps = {
  totalPages: number;
  prev: () => void;
  next: () => void;
  currentPage: number;
};

export const PaginationButtons = ({
  totalPages,
  prev,
  next,
  currentPage,
}: PaginationButtonsProps) => {
  const pages = Array.from(Array(totalPages).keys());

  return (
    <div
      className={cx({ paginationContainer: true, hidden: totalPages === 1 })}
    >
      <div className={s.pagination}>
        <button className={s.button} onClick={prev}>
          <img src={leftArrow} alt="left arrow" />
        </button>
        <div className={s.pageNumbers}>
          {pages.map((page) => {
            const pageClass = cx({
              pageNum: true,
              selected: page + 1 === currentPage,
            });
            return (
              <div key={page} className={pageClass}>
                {page + 1}
              </div>
            );
          })}
        </div>
        <button className={s.button} onClick={next}>
          <img src={rightArrow} alt="right arrow" />
        </button>
      </div>
    </div>
  );
};
