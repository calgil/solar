/* eslint-disable react/react-in-jsx-scope */
import s from "../styles/components/ApprenticeSearch.module.scss";
import search from "../assets/search.png";
import classNames from "classnames/bind";
import { useCombobox } from "downshift";
import { useUsers } from "../hooks/useUsers";
import close from "../assets/close.png";

const cx = classNames.bind(s);

type SearchProps = {
  onSelect: (selected: string) => void;
  onInputChange: (value: string) => void;
  inputValue: string;
  clearSearch: () => void;
};

export const ApprenticeSearch = ({
  onSelect,
  onInputChange,
  inputValue,
  clearSearch,
}: SearchProps) => {
  const { apprentices } = useUsers();
  const apprenticeNames = apprentices.map((apprentice) => apprentice.name);

  const {
    getInputProps,
    getMenuProps,
    highlightedIndex,
    isOpen,
    getItemProps,
  } = useCombobox({
    items: apprenticeNames,
    selectedItem: inputValue,
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        onSelect(selectedItem);
      }
    },
    onInputValueChange({ inputValue }) {
      if (inputValue) {
        onInputChange(inputValue);
      }
      if (!inputValue) {
        onInputChange("");
      }
    },
  });

  const filteredOptions = apprenticeNames.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className={s.searchContainer}>
      <input
        className={s.searchInput}
        value={inputValue}
        type="text"
        placeholder="Apprentice Name"
        {...getInputProps({ value: inputValue })}
      />
      <div className={s.searchImg}>
        <img src={search} alt="search" />
      </div>
      <button className={s.clearBtn} onClick={clearSearch}>
        <div className={s.close}>
          <img src={close} alt="close" />
        </div>
      </button>
      <ul
        className={cx({ optionList: true, closed: !isOpen })}
        {...getMenuProps()}
      >
        {isOpen &&
          filteredOptions.map((item, index) => {
            const optionIndex = apprenticeNames.indexOf(item);

            return (
              <li
                className={cx({
                  option: true,
                  highlighted: highlightedIndex === optionIndex,
                })}
                key={`${item}${index}`}
                {...getItemProps({
                  item,
                  index: optionIndex,
                })}
              >
                {item}
              </li>
            );
          })}
      </ul>
    </div>
  );
};
