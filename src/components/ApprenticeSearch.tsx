/* eslint-disable react/react-in-jsx-scope */
import s from "../styles/components/ApprenticeSearch.module.scss";
import search from "../assets/search.png";
import classNames from "classnames/bind";
import { useCombobox } from "downshift";
import { useUsers } from "../hooks/useUsers";

const cx = classNames.bind(s);

type SearchProps = {
  onSelect: (selected: string) => void;
  onInputChange: (value: string) => void;
  inputValue: string;
};

export const ApprenticeSearch = ({
  onSelect,
  onInputChange,
  inputValue,
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
