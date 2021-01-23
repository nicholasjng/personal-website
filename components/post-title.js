import PropTypes from "prop-types";

export default function PostTitle({ children }) {
  return (
    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
      {children}
    </h1>
  );
}

PostTitle.propTypes = {
  children: PropTypes.string,
};

PostTitle.defaultProps = {
  children: "",
};
