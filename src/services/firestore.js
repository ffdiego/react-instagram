import { storage } from "../lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export function uploadFile(file) {
  const fileRef = ref(storage, "avatars/" + file.name);
  const uploadTask = uploadBytesResumable(fileRef, file);

  return uploadTask;
}

export function getFile(setImg) {
  const gsReference = ref(storage, "avatars/mech.png");
  getDownloadURL(gsReference).then((url) => {
    setImg(url);
  });
}

/* 
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
        setPhotoUploaded(true);
      }
    );
*/
