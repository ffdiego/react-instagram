import { storage } from "../lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addPhoto } from "./firebase";

export function AvatarURL(user) {
  const imgurl = `https://firebasestorage.googleapis.com/v0/b/instagram-clone-react-6a2b5.appspot.com/o/avatar%2F${user}.jpg?alt=media`;
  return imgurl;
}

//specific functions that calls the two above functions
export function uploadAvatar(file, user) {
  const fileRef = ref(storage, `avatar/${user}.jpg`);

  const uploadTask = uploadBytesResumable(fileRef, file, {
    contentType: "image/jpeg",
  });
  return uploadTask;
}

export async function uploadPhoto(base64url_file, user, caption, place) {
  const now = new Date();
  const filename =
    now.getFullYear() +
    "-" +
    now.getMonth() +
    "-" +
    now.getDate() +
    "-" +
    now.getHours() +
    "h" +
    now.getMinutes() +
    "m" +
    now.getSeconds() +
    "s";

  const fileRef = ref(storage, `photos/${user}/${filename}.jpg`);

  const uploadTask = new Promise((resolve, reject) => {
    uploadBytesResumable(fileRef, base64url_file, {
      contentType: "image/jpeg",
    })
      .then(() => {
        getDownloadURL(fileRef).then((url) =>
          addPhoto(user, caption, place, url).then(() => resolve())
        );
      })
      .catch((error) => reject(error));
  });

  return uploadTask;
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
