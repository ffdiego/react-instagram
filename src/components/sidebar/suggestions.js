import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import Skeleton from "react-loading-skeleton";

import { getSuggestedProfiles } from "../../services/firebase";
import SuggestedProfile from "./SuggestedProfile";

export default function Suggestions({
  username,
  following,
  loggedInUserDocId,
}) {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(username, following);
      setProfiles(response);
    }

    if (username) suggestedProfiles();
  }, [username]);

  return !profiles ? (
    <Skeleton count={10} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col ">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => {
          return (
            <SuggestedProfile
              key={profile.docId}
              profile={profile}
              username={username}
            />
          );
        })}
      </div>
    </div>
  ) : null;
}

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedInUserDocId: PropTypes.string,
};
