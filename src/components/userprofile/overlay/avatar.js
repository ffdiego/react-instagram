import { Link } from "react-router-dom";

export default function Avatar({ username, size }) {
  return (
    <Link to={`/${username}`}>
      <img
        className={`w-${size ? size : "8"} rounded-full mr-2`}
        alt={`${username} avatar`}
        src={`/images/avatars/${username}.jpg`}
      />
    </Link>
  );
}
