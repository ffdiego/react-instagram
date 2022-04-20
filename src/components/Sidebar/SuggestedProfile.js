import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { addFollower } from "../../services/firebase";

export default function SuggestedProfile({ username, profile }) {
  const [followed, setFollowed] = useState(false);
  async function HandleFollowUser() {
    setFollowed(true);
    console.log(username, "agora segue", profile.username);
    await addFollower(username, profile.username);
  }

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          src={`/images/avatars/${profile.username}.jpg`}
          alt={`${profile.username} avatar`}
        />
        <Link to={`/${profile.username}`}>
          <p className="font-bold text-sm">{profile.username}</p>
        </Link>
      </div>
      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={HandleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  username: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
};
