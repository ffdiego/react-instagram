import { useReducer, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUserPhotosByUsername } from "../../services/firebase";

import ProfileHeader from "./profileHeader";
import Photos from "./photos";
import Overlay from "./overlay";

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

  const [showOverlay, setShowOverlay] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);

  function toggleOverlay(e, photo) {
    //if (e.target.id == "outer" || e.target.id == "photo-item")
    if (photo) {
      console.log("received:", photo);
      setActivePhoto(photo);
    }
    setShowOverlay(!showOverlay);
  }

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
    <div className={showOverlay ? "h-full overflow-hidden" : ""}>
      <ProfileHeader
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowercount={dispatch}
      />
      <Photos photos={photosCollection} toggleOverlay={toggleOverlay} />
      <Overlay
        showOverlay={showOverlay}
        toggleOverlay={toggleOverlay}
        activePhoto={activePhoto}
      />
    </div>
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
