import { months } from "../data/months";

export const displayDate = (date: string) => {
  const [month, year] = date.split("-");
  const monthName = months.find((m) => m.id === +month)?.name;
  return `${monthName}, ${year}`;
};
