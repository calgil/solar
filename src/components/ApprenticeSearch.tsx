/* eslint-disable react/react-in-jsx-scope */
import s from "../styles/components/ApprenticeSearch.module.scss";
import search from "../assets/search.png";
import classNames from "classnames/bind";
import { useCombobox } from "downshift";

const cx = classNames.bind(s);

type SearchProps = {
  options: string[];
  onSelect: (selected: string) => void;
  onInputChange: (value: string) => void;
  inputValue: string;
};

export const ApprenticeSearch = ({
  options,
  onSelect,
  onInputChange,
  inputValue,
}: SearchProps) => {
  const {
    getInputProps,
    getMenuProps,
    highlightedIndex,
    isOpen,
    getItemProps,
  } = useCombobox({
    items: options,
    selectedItem: null,
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        onSelect(selectedItem);
      }
    },
    onInputValueChange({ inputValue }) {
      if (inputValue) {
        onInputChange(inputValue);
      }
    },
  });

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className={s.searchContainer}>
      <input
        className={s.searchInput}
        value={inputValue}
        type="text"
        placeholder="Apprentice Name"
        {...getInputProps()}
      />
      <div className={s.searchImg}>
        <img src={search} alt="search" />
      </div>
      <ul
        className={cx({ optionList: true, closed: !isOpen })}
        {...getMenuProps()}
      >
        {isOpen &&
          filteredOptions.map((item, index) => (
            <li
              className={cx({
                option: true,
                highlighted: highlightedIndex === index,
              })}
              key={`${item}${index}`}
              {...getItemProps({
                item,
                index,
              })}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};
