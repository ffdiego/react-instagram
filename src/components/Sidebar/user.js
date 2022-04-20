import { memo } from "react";
import { PropTypes } from "prop-types";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";

const User = ({ username, fullname }) =>
  !username || !fullname ? (
    <Skeleton height={47} />
  ) : (
    <Link
      to={`/${username}`}
      className="grid grid-cols-4 gap-4 mb-4 items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        <Avatar user={username} size={16} clickable={false} />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullname}</p>
      </div>
    </Link>
  );

export default memo(User);

User.propTypes = {
  username: PropTypes.string,
  fullname: PropTypes.string,
};
