import { useEffect, useState } from "react";

import FileInputScreen from "./fileInputScreen";
import { ArrowBackwardIcon } from "../icons";

export default function NewPhoto({ showOverlay, toggleOverlay }) {
  const [title, setTitle] = useState("Create a new post");
  const [photo, setPhoto] = useState(null);
  const [crop, setCrop] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    if (showOverlay) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [showOverlay]);

  function clearPhotoAndOverlay() {
    setPhoto(null);
    setCrop(null);
    toggleOverlay();
  }

  function handleNext() {
    if (crop) {
      const imgjpg = crop.toDataURL("image/jpeg", 0.92);

      var newTab = window.open();
      newTab.document.body.innerHTML = "<img src=" + imgjpg + " >";
    }
  }

  return (
    <div
      className={`bg-gray-overlay h-screen w-screen top-0 left-0 fixed px-20 flex items-center z-50 ${
        showOverlay ? "hidden" : ""
      }`}
      onMouseDown={clearPhotoAndOverlay}
    >
      <div
        className="bg-white [height:80vh] [min-height:300px] aspect-square mx-auto drop-shadow-2xl rounded-xl flex flex-col overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between items-stretch w-full h-12 border-gray-primary border-b text-lg font-semibold">
          <div className="ml-4 h-full">
            <button className="h-full" onClick={clearPhotoAndOverlay}>
              <ArrowBackwardIcon />
            </button>
          </div>
          <div className="self-center">{title}</div>
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
        <div className="h-full flex flex-col items-center justify-center">
          <FileInputScreen
            photo={photo}
            setPhoto={setPhoto}
            setCrop={setCrop}
          />
        </div>
      </div>
    </div>
  );
}
