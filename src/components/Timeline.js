import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";
import Post from "./Post";
import PhotoOverlay from "./PhotoOverlay";

export default function Timeline() {
  // we need to get the logged in user's photos (hook)
  const { photos } = usePhotos();
  // on loading the photos, we need to use react skeleton
  // if we have photos, render them (create a post component)
  // if the usar has no photos, tell them to create some photos

  const [showOverlay, setShowOverlay] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);

  function toggleOverlay(e, photo) {
    if (photo) setActivePhoto(photo);
    setShowOverlay(!showOverlay);
  }

  return (
    <div className="mt-20 container col-span-2">
      {!photos ? (
        <>
          <Skeleton className="mb-5" count={4} height={500} />
        </>
      ) : photos?.length > 0 ? (
        photos.map((content) => (
          <Post
            key={content.docId}
            content={content}
            toggleOverlay={toggleOverlay}
          />
        ))
      ) : (
        <p className="text-center text-2xl">Follow people to see photos</p>
      )}
      <PhotoOverlay
        showOverlay={showOverlay}
        toggleOverlay={toggleOverlay}
        photo={activePhoto}
        profile={{ username: activePhoto?.author }}
      />
    </div>
  );
}
