import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { addFollower } from "../../services/firebase";
import Avatar from "../Avatar";

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
        <Avatar user={profile.username} size={8} clickable={false} />
        <Link className="ml-3 font-bold text-sm" to={`/${profile.username}`}>
          <p className="">{profile.username}</p>
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
