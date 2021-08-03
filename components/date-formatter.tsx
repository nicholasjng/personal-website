import { parseISO, format } from "date-fns";

type DateString = {
  dateString: string;
};

export default function DateFormatter({ dateString }: DateString): JSX.Element {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
}
