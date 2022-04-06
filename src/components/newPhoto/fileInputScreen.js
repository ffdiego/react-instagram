import { PhotosUploadIcon } from "../icons";
import { uploadFile } from "../../services/firestore";
import { useState } from "react";

export default function FileInputScreen() {
  function fileSelectedHandler(e) {
    const uploadTask = uploadFile(e.target.files[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("Upload is " + progress + "% done");
        setUploadProgress(progress);
      },
      (error) => {
        console.log("something went wrong with the upload");
      },
      () => {
        console.log("upload finished sucesfully");
      }
    );
  }

  const [uploadProgress, setUploadProgress] = useState(0);

  function filePicker() {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = fileSelectedHandler;
    input.click();
  }

  return (
    <>
      <PhotosUploadIcon />
      <p className="mt-5 mb-10 text-2xl font-thin">Insert your photos here</p>
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
  );
}
