import { Link } from "react-router-dom";
import { AvatarURL } from "../services/firestore";

export default function Avatar({ user, size, clickable = true }) {
  const _size = size || 8;
  const ImgElement = (
    <img
      className={`rounded-full w-${_size} h-${_size} flex`}
      src={AvatarURL(user)}
      onError={(e) => {
        e.target.src = "/images/avatars/default.png";
      }}
      alt={`${user} profile`}
    />
  );

  return (clickable && <Link to={`/${user}`}>{ImgElement}</Link>) || ImgElement;
}
