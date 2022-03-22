import { useState, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { getUserPhotosByUsername } from "../../services/firebase";

import ProfileHeader from "./profileHeader";
import Photos from "./photos";

export default function UserProfile({ user }) {
  //reducer
  const username = user.username;

  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  };
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUsername(username);

      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
      });
    }
    if (username) getProfileInfoAndPhotos();
  }, [username, user]);

  return (
    <>
      <ProfileHeader
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowercount={dispatch}
      />
      <Photos photos={photosCollection} />
    </>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number,
    emailAddress: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    fullName: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string,
  }),
};
