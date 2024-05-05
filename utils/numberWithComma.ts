import dayjs from "dayjs";

export const numberWithComma = (number: number) => {
  return Number(number)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const DateLongTH = (date: string) => {
  if (!date) return "";
  dayjs.locale("th");
  return dayjs(date).format("DD MMMM BBBB");
};
