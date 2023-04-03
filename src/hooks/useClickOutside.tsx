import { RefObject, useEffect } from "react";

type UseClickOutsideProps = {
  onClickOutside: () => void;
  dependencies: React.DependencyList;
  containerRef: RefObject<HTMLElement>;
};

export const useClickOutside = ({
  onClickOutside,
  dependencies,
  containerRef,
}: UseClickOutsideProps): void => {
  const handleClickOutside = (e: MouseEvent): void => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      onClickOutside();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [...dependencies]);
};
