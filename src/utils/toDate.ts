export function toDate(month: number, year: number): Date {
  return new Date(year, month - 1);
}
