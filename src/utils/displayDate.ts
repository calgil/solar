// import { months } from "../data/months";

export const displayDate = (date: Date) => {
  const monthName = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${monthName}, ${year}`;
};
