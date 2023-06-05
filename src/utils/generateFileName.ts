export const generateFileName = (
  name: string,
  date: Date,
  fileType: string,
  folder: string
): string => {
  const [firstName, lastName] = name.toLowerCase().split(" ");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  if (!lastName) {
    return `${firstName}_${folder}_${month}_${year}.${fileType
      .slice(-3)
      .toLowerCase()}`;
  }

  return `${lastName}_${firstName}_${folder}_${month}_${year}.${fileType
    .slice(-3)
    .toLowerCase()}`;
};
