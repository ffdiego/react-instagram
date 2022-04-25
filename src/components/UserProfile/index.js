import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getProfile } from "../../services/firebase";

import ProfileHeader from "./profileHeader";
import Photos from "./photos";
import PhotoOverlay from "../PhotoOverlay";

export default function UserProfile({ profile }) {
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
    }
    if (profile.username) getProfileInfoAndPhotos();
  }, [profile]);

  return (
    <div>
      <ProfileHeader profile={profile} info={profileInfo} />
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
