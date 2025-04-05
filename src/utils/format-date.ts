import { format, parse } from "date-fns";

export const formatDate = (date: string, newFormat: string) => {
  return format(parse(date, "yyyyMMdd", new Date()), newFormat);
};
