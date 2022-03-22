import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-user";
import { isUserFollowingProfile } from "../../services/firebase";
import UserContext from "../../context/user";

export default function ProfileHeader({
  photosCount,
  followerCount,
  setFollowercount,
  profile: {
    //this represents the current profile being viewed
    docId: profileDocId,
    userId: profileUserId,
    fullname,
    following = [],
    username: profileUsername,
  },
}) {
  const { user } = useUser(); //this represents the logged in user

  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = profileUsername && profileUsername !== user.username;

  const handleToggleFollow = () => {
    setIsFollowingProfile(!isFollowingProfile);
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfile(isFollowing);
    };

    if (user?.username && profileUserId) isLoggedInUserFollowingProfile();
  }, [user.username, profileUserId]);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center">
        <img
          className="rounded-full h-40 w-40 flex"
          alt={`${profileUsername} avatar`}
          src={`/images/avatars/${profileUsername}.jpg`}
        />
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profileUsername}</p>
          {activeBtnFollow && (
            <button
              className={`${
                isFollowingProfile ? "bg-red-medium" : "bg-blue-medium"
              } font-bold text-sm rounded text-white w-20 h-8`}
              type="button"
              onClick={handleToggleFollow}
            >
              {isFollowingProfile ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

ProfileHeader.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowercount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullname: PropTypes.string,
    username: PropTypes.string,
    following: PropTypes.array,
  }).isRequired,
};
