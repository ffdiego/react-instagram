import { Link } from "react-router-dom";
import { AvatarURL } from "../services/firestore";

export default function Avatar({ user, size, clickable = true }) {
  const ImgElement = (
    <img
      className={`rounded-full w-${size ? size : "8"} flex`}
      src={AvatarURL(user)}
      onError={(e) => {
        e.target.src = "/images/avatars/default.png";
      }}
      alt={`${user} profile`}
    />
  );

  return (clickable && <Link to={`/${user}`}>{ImgElement}</Link>) || ImgElement;
}
