import PropTypes from "prop-types";

export default function Container({ children }) {
  return <div className="container mx-auto px-20">{children}</div>;
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};
