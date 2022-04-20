import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import UserContext from "../../context/user";
import {
  addFollower,
  isUserFollowingProfile,
  toggleFollow,
} from "../../services/firebase";

export default function ProfileHeader({ profile, info, setFollowercount }) {
  const user = useContext(UserContext); //this represents the logged in user

  const [isFollowingProfile, setIsFollowingProfile] = useState(false);

  const activeBtnFollow =
    profile.username && profile.username !== user.username;

  const handleToggleFollow = async () => {
    setFollowercount({
      followerCount: isFollowingProfile
        ? profile.followerCount - 1
        : profile.followerCount + 1,
    });
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
  }, [user.username, profile.username]);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg border-b border-gray-primary pb-4">
      <div className="container flex justify-center">
        <div className="w-40 rounded-full flex overflow-hidden relative group">
          <div
            className={`absolute bg-black-faded w-full h-1/4 bottom-0 left-0 z-10 justify-center hidden ${
              user.username === profile.username && "group-hover:flex"
            }`}
          >
            <p className="text-white">Change</p>
          </div>
          <img
            className="w-40"
            alt={`${profile.username} avatar`}
            src={`/images/avatars/${profile.username}.jpg`}
          />
        </div>
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profile.username}</p>
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
          {!info ? (
            <Skeleton />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{info.photos.length}</span>
                {info.photosCount !== 1 ? " photos" : " photo"}
              </p>
              <p className="mr-10">
                <span className="font-bold">{info.followerCount}</span>
                {info.followerCount !== 1 ? " followers" : " follower"}
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
  setFollowercount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullname: PropTypes.string,
    username: PropTypes.string,
    following: PropTypes.array,
    followers: PropTypes.array,
  }),
};
