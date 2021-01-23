import { parseISO, format } from "date-fns";
import PropTypes from "prop-types";

// type DateString = {
//   dateString: string
// }

export default function DateFormatter({ dateString }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
}

DateFormatter.propTypes = {
  dateString: PropTypes.string,
};

DateFormatter.defaultProps = {
  dateString: "",
};
