/* eslint-disable react/react-in-jsx-scope */
import s from "../styles/components/MonthlyProgressReports.module.scss";
import filter from "../assets/filter.png";
import { useRef, useState } from "react";
import { ApprenticeSearch } from "./ApprenticeSearch";
import { MprTable } from "./MprTable";
// import { PaginationButtons } from "./PaginationButtons";
import { useReactToPrint } from "react-to-print";
import { useStaffData } from "../hooks/useStaffData";
import { Modal } from "./Modal";
import { StaffFilter } from "./StaffFilter";

export const MonthlyProgressReports = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const { apprenticeData, handleFilterChange, fetchApprenticeByName, clear } =
    useStaffData();

  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [inputValue, setInputValue] = useState("");

  const handleSelect = (value: string) => {
    setInputValue(value);
    fetchApprenticeByName(value);
  };

  const onInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleClearSearch = () => {
    clear();
    setInputValue("");
  };

  return (
    <div className={s.reports}>
      <div className={s.adminActions}>
        <button
          className={s.filterBtn}
          onClick={() => setIsFilterModalOpen(true)}
        >
          <div className={s.filterImg}>
            <img src={filter} alt="filter" />
          </div>
          Filters
        </button>
        <ApprenticeSearch
          onSelect={handleSelect}
          onInputChange={onInputChange}
          inputValue={inputValue}
          clearSearch={handleClearSearch}
        />
        <button className={s.link} onClick={handlePrint}>
          Print Report
        </button>
      </div>
      <MprTable data={apprenticeData} tableRef={componentRef} />
      {/* <PaginationButtons
        totalPages={totalPages}
        prev={prev}
        next={next}
        currentPage={currentPage}
      /> */}
      <Modal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Filter"
        filter
      >
        <StaffFilter
          closeModal={() => setIsFilterModalOpen(false)}
          handleFilter={handleFilterChange}
          clear={handleClearSearch}
        />
      </Modal>
    </div>
  );
};
