import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-user";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";

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
    followers = [],
    username: profileUsername,
  },
}) {
  const { user } = useUser(); //this represents the logged in user

  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = profileUsername && profileUsername !== user.username;

  const handleToggleFollow = async () => {
    setFollowercount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    setIsFollowingProfile(!isFollowingProfile);
    await toggleFollow(
      isFollowingProfile,
      user.docId,
      profileDocId,
      profileUserId,
      user.userId
    );
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
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg mt-20">
      <div className="container flex justify-center">
        <img
          className="w-40 rounded-full flex"
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
        <div className="container flex mt-4">
          {followers === undefined || following === undefined ? (
            <Skeleton />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount}</span>
                {photosCount !== 1 ? " photos" : " photo"}
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {followers !== 1 ? " followers" : " follower"}
              </p>
              <p className="mr-10">
                <span className="font-bold">{following.length}</span> following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!fullname ? <Skeleton width={300} /> : fullname}
          </p>
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
    followers: PropTypes.array,
  }).isRequired,
};
