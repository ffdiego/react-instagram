import Firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

//here i want to import the seed file
//import { seedDatabase } from "../seed";

const config = {
  apiKey: "AIzaSyAUbiKkPlH6hwoTEvkggpI_xmNAdZGAwlQ",
  authDomain: "instagram-clone-react-6a2b5.firebaseapp.com",
  projectId: "instagram-clone-react-6a2b5",
  storageBucket: "instagram-clone-react-6a2b5.appspot.com",
  messagingSenderId: "366368103408",
  appId: "1:366368103408:web:ebcfed7561bb71ba1c5b35",
  measurementId: "G-LBB8K4WFZF",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
