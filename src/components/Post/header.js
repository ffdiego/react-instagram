import PropTypes from "prop-types";
import Avatar from "../Avatar";

export default function Header({ username }) {
  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        <div className="flex items-center">
          <Avatar user={username} size={8} />
          <p className="ml-3 font-bold">{username}</p>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
};
