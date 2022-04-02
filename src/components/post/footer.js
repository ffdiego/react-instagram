import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Footer({ author, caption }) {
  return (
    <div className="p-4 pt-2 pb-0">
      <span className="mr-1 font-bold">
        <Link to={`/${author}`}>{author}</Link>
      </span>
      <span>{caption}</span>
    </div>
  );
}
//p-4 pt-2 pb-0
//mr-1 font-bold
Footer.propTypes = {
  caption: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};
