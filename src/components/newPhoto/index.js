import { useEffect, useState } from "react";

import PhotoCanvas from "./photoCanvas";
import { ArrowBackwardIcon } from "../icons";
import PostDescriptionScreen from "./postDescriptionScreen";

export default function NewPhoto({ showOverlay, toggleOverlay }) {
  const [photo, setPhoto] = useState(null);
  const [crop, setCrop] = useState(null);
  const [description, setDescription] = useState(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (showOverlay) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showOverlay]);

  function exit() {
    switch (step) {
      case 2:
        setCrop(null);
      case 1:
        setPhoto(null);
      case 0:
        toggleOverlay();
        break;
    }
  }

  function handleBack() {
    switch (step) {
      case 0:
        toggleOverlay();
        return;
      case 1:
        setPhoto(null);
        break;
      case 2:
        setCrop(null);
        break;
      default:
        throw new Error();
    }
    setStep(step - 1);
  }

  function handleNext() {
    switch (step) {
      case 0:
        break;
      case 1:
        if (!crop) return;
        const imgjpg = crop.toDataURL("image/jpeg", 0.92);
        setCrop(imgjpg);
        console.log("crop", crop);
        break;
      case 2:
        //post the img
        exit();
        break;
      default:
        throw new Error();
    }
    setStep(step + 1);
  }

  return (
    <div
      className={`bg-gray-overlay h-screen w-screen top-0 left-0 fixed px-20 flex items-center z-50 ${
        showOverlay ? "" : "hidden"
      }`}
      onMouseDown={exit}
    >
      <div
        className="bg-white [min-width:300px] [min-height:300px] mx-auto drop-shadow-2xl rounded-xl flex flex-col overflow-hidden transition-all"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between items-stretch w-full h-12 border-gray-primary border-b text-lg font-semibold">
          <div className="ml-4 h-full">
            <button className="h-full" onClick={handleBack}>
              <ArrowBackwardIcon />
            </button>
          </div>
          <div className="self-center">Create a new post</div>
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
        {step < 2 ? (
          <PhotoCanvas
            photo={photo}
            setPhoto={setPhoto}
            setCrop={setCrop}
            setStep={setStep}
          />
        ) : (
          <PostDescriptionScreen photo={crop} setDescription={setDescription} />
        )}
      </div>
    </div>
  );
}
