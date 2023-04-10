export const generateFileName = (
  name: string,
  date: Date,
  fileType: string
): string => {
  const [firstName, lastName] = name.toLowerCase().split(" ");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${lastName}_${firstName}_mpr_${month}_${year}.${fileType
    .slice(-3)
    .toLowerCase()}`;
};
