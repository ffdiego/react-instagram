import PropTypes from "prop-types";

export default function Footer({ author, caption }) {
  return (
    <div className="p-4 pt-2 pb-0">
      <span className="mr-1 font-bold">{author}</span>
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
