import { memo } from "react";
import { PropTypes } from "prop-types";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const User = ({ username, fullname }) =>
  !username || !fullname ? (
    <Skeleton count={5} height={61} />
  ) : (
    <Link to={`/p/${username}`} className="grid">
      <p>{username}</p>
    </Link>
  );

export default User;

User.propTypes = {
  username: PropTypes.string,
  fullname: PropTypes.string,
};
