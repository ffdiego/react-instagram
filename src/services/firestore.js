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
