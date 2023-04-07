export function toDate(month: number, year: number): Date {
  const date = new Date();
  date.setMonth(month - 1);
  date.setFullYear(year);
  date.setDate(1);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}
