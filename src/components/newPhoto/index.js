import { useState } from "react";

import FileInputScreen from "./fileInputScreen";
import { ArrowBackwardIcon } from "../icons";
import { clear } from "@testing-library/user-event/dist/clear";

export default function NewPhoto({ showOverlay, toggleOverlay }) {
  const [photo, setPhoto] = useState(null);
  const [crop, setCrop] = useState(null);

  function clearPhotoAndOverlay() {
    setPhoto(null);
    toggleOverlay();
  }

  function handleNext() {
    function download(filename, text) {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }

    if (crop) {
      console.log(crop);
      fetch(crop).then((res) => console.log("res", res));
      crop.toDataURL("image/jpeg", 0.9).then((dataUrl) => {
        download("photo.jpg", dataUrl);
      });
    }
  }

  const [title, setTitle] = useState("Create a new post");

  return (
    <div
      className={`bg-gray-overlay h-screen w-screen top-0 left-0 fixed px-20 flex items-center z-50 ${
        showOverlay || "hidden"
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
