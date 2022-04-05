import { storage } from "../lib/firebase";
import { ref, uploadBytesResumable } from "firebase/storage";

export function uploadFile(file) {
  const fileRef = ref(storage, file.name);
  const uploadTask = uploadBytesResumable(fileRef, file);

  return uploadTask;
}
