import { useState, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import ProfileHeader from "./profileHeader";

import { getUserPhotosByUsername } from "../../services/firebase";

export default function UserProfile({ username }) {
  //reducer
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
      console.log(photos);
      //dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length});
    }
    if (username) getProfileInfoAndPhotos();
  }, [username]);

  return (
    <>
      <ProfileHeader />
      <p>Hello {username}</p>
    </>
  );
}
