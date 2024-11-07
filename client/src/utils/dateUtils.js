import { format, parseISO, isValid } from "date-fns";

export const formatDate = (dateString) => {
  const data = parseISO(dateString);
  return isValid(data) ? format(data, "MM yyyy") : "Present";
};
