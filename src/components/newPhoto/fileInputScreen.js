import { PhotosUploadIcon } from "../icons";
import { uploadFile } from "../../services/firestore";
import { useState, useEffect } from "react";

import PhotoCrop from "./photoCrop";

export default function FileInputScreen({ photo, setPhoto, setCrop }) {
  function fileSelectedHandler(e) {
    setPhoto(e.target.files[0]);
  }

  function filePicker() {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = fileSelectedHandler;
    input.click();
  }

  return (
    <>
      {photo ? (
        <PhotoCrop photo={photo} setCrop={setCrop} />
      ) : (
        <>
          <PhotosUploadIcon />
          <p className="mt-5 mb-10 text-2xl font-thin">
            Insert your photo here
          </p>
          <button
            className="bg-transparent  font-semibold py-2 px-4 border rounded transition-all duration-300
             border-blue-medium text-blue-medium
             hover:bg-blue-medium hover:text-white "
            onClick={filePicker}
          >
            Choose a photo
          </button>
        </>
      )}
    </>
  );
}
