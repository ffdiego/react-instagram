import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import UserContext from "../../context/user";
import ChangeAvatar from "../ChangeAvatar";
import { addFollower, isUserFollowingProfile } from "../../services/firebase";

export default function ProfileHeader({ profile, info }) {
  const user = useContext(UserContext); //this represents the logged in user

  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  function showFollowButton() {
    if (!user) return false;
    return profile?.username !== user?.username;
  }

  const handleToggleFollow = async () => {
    setFollowerCount((prev) => (isFollowingProfile ? prev - 1 : prev + 1));
    setIsFollowingProfile(!isFollowingProfile);
    await addFollower(user.username, profile.username, isFollowingProfile);
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profile.username
      );
      setIsFollowingProfile(isFollowing);
    };

    if (user?.username && profile.username) {
      if (profile.username !== user.username) isLoggedInUserFollowingProfile();
    }
  }, [user, profile]);

  useEffect(() => {
    setFollowerCount((prev) => info?.followerCount);
  }, [info, setFollowerCount]);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg border-b border-gray-primary pb-4">
      <div className="container flex justify-center">
        <ChangeAvatar profile={profile} />
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profile.username}</p>
          {showFollowButton() && (
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
          {!info ? (
            <Skeleton />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{info.photos.length}</span>
                {info.photosCount !== 1 ? " photos" : " photo"}
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {followerCount !== 1 ? " followers" : " follower"}
              </p>
              <p className="mr-10">
                <span className="font-bold">{info.followingCount}</span>{" "}
                following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!profile.fullname ? <Skeleton width={300} /> : profile.fullname}
          </p>
        </div>
      </div>
    </div>
  );
}

ProfileHeader.propTypes = {
  photosCount: PropTypes.number,
  followerCount: PropTypes.number,
  followingCount: PropTypes.number,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullname: PropTypes.string,
    username: PropTypes.string,
    following: PropTypes.array,
    followers: PropTypes.array,
  }),
};
