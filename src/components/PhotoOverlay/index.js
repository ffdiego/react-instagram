import Photo from "./photo";
import Info from "./info";
import { useEffect } from "react";

export default function PhotoOverlay({
  showOverlay,
  toggleOverlay,
  photo,
  profile,
}) {
  useEffect(() => {
    if (showOverlay) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "";
  }, [showOverlay]);

  return (
    <div
      className={`bg-gray-overlay h-screen w-screen top-0 left-0 fixed px-20 flex items-center z-50 ${
        showOverlay || "hidden"
      }`}
      onClick={toggleOverlay}
    >
      <div
        className="bg-white [max-height:90%] [min-height:70%] mx-auto drop-shadow-2xl rounded-r-lg flex"
        onClick={(e) => e.stopPropagation()}
      >
        {photo && profile && (
          <>
            <Photo photo={photo} />
            <Info photo={photo} profile={profile} />
          </>
        )}
      </div>
    </div>
  );
}
