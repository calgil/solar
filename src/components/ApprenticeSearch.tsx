/* eslint-disable react/react-in-jsx-scope */
import { useRef, useState } from "react";
import s from "../styles/components/ApprenticeSearch.module.scss";
import { User } from "../types/user.type";
import search from "../assets/search.png";
import classNames from "classnames/bind";

const cx = classNames.bind(s);

type SearchProps = {
  options: User[];
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
  const [visibleOptions, setVisibleOptions] = useState<User[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    onInputChange(input);
    setFocusedIndex(-1);

    if (input) {
      const matchingOptions = options.filter((option) =>
        option.name.toLowerCase().includes(input.toLowerCase())
      );
      return setVisibleOptions(matchingOptions);
    }
    setVisibleOptions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    e.preventDefault();
    if (e.key === "ArrowUp") {
      if (focusedIndex > 0) {
        setFocusedIndex(focusedIndex - 1);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (focusedIndex < visibleOptions.length - 1) {
        setFocusedIndex(focusedIndex + 1);
      }
    }
  };

  const handleApprenticeSelection = (name: string) => {
    onSelect(name);
    setVisibleOptions([]);
  };

  return (
    <div className={s.searchContainer}>
      <form>
        <input
          className={s.searchInput}
          type="text"
          placeholder="Apprentice Name"
          value={inputValue}
          ref={inputRef}
          onChange={handleInputChange}
        />
        {visibleOptions.length > 0 && (
          <ul
            className={s.optionsContainer}
            ref={optionsRef}
            onKeyDown={handleKeyDown}
          >
            {visibleOptions.map((option, i) => (
              <li
                className={`${s.option} ${focusedIndex === i ? s.focused : ""}`}
                key={option.id}
                onClick={() => handleApprenticeSelection(option.name)}
              >
                {option.name}
              </li>
            ))}
          </ul>
        )}
      </form>
      <div className={s.searchImg}>
        <img src={search} alt="search" />
      </div>
    </div>
  );
};
