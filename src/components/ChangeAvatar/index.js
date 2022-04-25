import { useEffect, useState, useContext } from "react";
import UserContext from "../../context/user";

import AvatarCanvas from "./AvatarCanvas";
import { ArrowBackwardIcon } from "../Icons";
import Avatar from "../Avatar";
import { uploadAvatar } from "../../services/firestore";

export default function ChangeAvatar({ profile, size }) {
  const user = useContext(UserContext);
  function profileIsUser() {
    if (!user) return false;
    return profile.username === user.username;
  }
  const _size = size || 40;

  function overlayToggle() {
    if (!profileIsUser) return;
    setShowOverlay(!showOverlay);
  }

  const [showOverlay, setShowOverlay] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [crop, setCrop] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (showOverlay) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showOverlay]);

  function handleExit() {
    setPhoto(null);
    setShowOverlay(false);
  }

  function handleBack() {
    if (photo) {
      setPhoto(null);
    } else {
      handleExit();
    }
  }

  function handleNext() {
    if (!photo) return;
    setUploading(true);
    crop.toBlob(
      (blob) => {
        const uploadTask = uploadAvatar(blob, user.username);
        uploadTask.then(() => {
          setUploading(false);
          handleExit();
          document.location.reload();
        });
      },
      "image/jpeg",
      0.92
    );
  }

  return (
    <>
      <div
        className="w-40 rounded-full flex overflow-hidden relative group"
        onClick={overlayToggle}
      >
        <div
          className={`absolute bg-black-faded w-full h-1/4 bottom-0 left-0 z-10 justify-center hidden ${
            profileIsUser && "group-hover:flex"
          }`}
        >
          <p className="text-white">Change</p>
        </div>
        <Avatar user={profile.username} size={_size} clickable={false} />
      </div>
      {/* OVERLAY HERE */}
      <div
        className={`bg-gray-overlay h-screen w-screen top-0 left-0 fixed px-20 flex items-center z-50 ${
          showOverlay ? "" : "hidden"
        }`}
        onMouseDown={handleExit}
      >
        <div
          id="new-avatar-modal"
          className="bg-white [min-width:300px] [min-height:300px] mx-auto drop-shadow-2xl rounded-xl flex flex-col overflow-hidden relative"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <header className="flex justify-between items-stretch w-full h-12 border-gray-primary border-b text-lg font-semibold">
            <div className="ml-4 h-full">
              <button className="h-full" onClick={handleBack}>
                <ArrowBackwardIcon />
              </button>
            </div>
            <div className="self-center">Set Avatar</div>
            <div className="mr-4 h-full">
              <button
                onClick={handleNext}
                className={`h-full font-bold text-blue-medium ${
                  !photo ? "opacity-40 cursor-default" : null
                }`}
              >
                Next
              </button>
            </div>
          </header>

          <AvatarCanvas photo={photo} setPhoto={setPhoto} setCrop={setCrop} />

          {uploading ? <UploadingDialog /> : null}
        </div>
      </div>
    </>
  );
}

function UploadingDialog() {
  return (
    <div className="absolute bg-gray-overlay w-full h-full flex items-center justify-center">
      <div className="bg-white w-1/2 mx-auto drop-shadow-2xl rounded-xl flex flex-col overflow-hidden">
        <div className="flex flex-col items-center justify-center m-8">
          <p className="text-lg font-semibold">Uploading Photo...</p>
          <p className="mt-8 text-5xl animate-bounce">📃</p>
        </div>
      </div>
    </div>
  );
}
