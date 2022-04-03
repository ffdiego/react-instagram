import Photo from "./photo";
import Info from "./info";

import { useRef } from "react";

export default function PhotoOverlay({
  showOverlay,
  toggleOverlay,
  photo,
  profile,
}) {
  return (
    <div
      className={`bg-gray-overlay h-screen w-screen top-0 left-0 fixed px-20 flex items-center z-50 ${
        showOverlay || "hidden"
      }`}
      onClick={toggleOverlay}
    >
      {/* White Frame */}
      <div
        className="bg-white [max-height:90%] mx-auto drop-shadow-2xl rounded-r-lg flex"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo (Left Side) */}
        <Photo photo={photo} />

        {/* Info  (Right Side) */}
        <Info photo={photo} profile={profile} />
      </div>
    </div>
  );
}
