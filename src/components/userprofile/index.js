import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getProfile, getUserPhotosByUsername } from "../../services/firebase";

import ProfileHeader from "./profileHeader";
import Photos from "./photos";
import PhotoOverlay from "../PhotoOverlay";

export default function UserProfile({ profile }) {
  //reducer
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    photosCollection: [],
    followerCount: 0,
  };
  const [{ photosCollection, followerCount }, dispatch] = useState(
    reducer,
    initialState
  );
  const [profileInfo, setProfileInfo] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);

  function toggleOverlay(e, photo) {
    //if (e.target.id == "outer" || e.target.id == "photo-item")
    if (photo) {
      setActivePhoto(photo);
    }
    setShowOverlay(!showOverlay);
  }

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      setProfileInfo(await getProfile(profile.username));
      console.log(profileInfo);
    }
    if (profile.username) getProfileInfoAndPhotos();
  }, [profile.username]);

  return (
    <div className={showOverlay ? "overflow-hidden [max-height:80vh]" : ""}>
      <ProfileHeader
        profile={profile}
        info={profileInfo}
        setFollowercount={dispatch}
      />
      <Photos photos={profileInfo?.photos} toggleOverlay={toggleOverlay} />
      <PhotoOverlay
        showOverlay={showOverlay}
        toggleOverlay={toggleOverlay}
        photo={activePhoto}
        profile={profile}
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
