export const fromStringDateToObjectDate = (stringDate) => {
  if (stringDate == null) return;
  const arrayOfDateValues = stringDate.split("-");
  const year = arrayOfDateValues[0];
  const monthIndex = arrayOfDateValues[1] - 1;
  const day = arrayOfDateValues[2];
  return new Date(year, monthIndex, day);
};

