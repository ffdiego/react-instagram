import { PhotosUploadIcon } from "../icons";
import { uploadFile } from "../../services/firestore";
import { useState, useEffect } from "react";

import AvatarCrop from "./avatarCrop";

export default function FileInputScreen() {
  function fileSelectedHandler(e) {
    setPhotoUploaded(e.target.files[0]);
  }

  const [uploadProgress, setUploadProgress] = useState(0);

  const [photoUploaded, setPhotoUploaded] = useState(null);

  function filePicker() {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = fileSelectedHandler;
    input.click();
  }

  return (
    <>
      {photoUploaded ? (
        <AvatarCrop photoUploaded={photoUploaded} />
      ) : (
        <>
          <PhotosUploadIcon />
          <p className="mt-5 mb-10 text-2xl font-thin">
            Insert your photos here
          </p>
          <button
            className="bg-transparent  font-semibold py-2 px-4 border rounded transition-all duration-300
             border-blue-medium text-blue-medium
             hover:bg-blue-medium hover:text-white "
            onClick={filePicker}
          >
            {uploadProgress > 0 && uploadProgress < 100
              ? `Uploading ${uploadProgress}%`
              : "Choose a photo"}
          </button>
        </>
      )}
    </>
  );
}
