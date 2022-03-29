import { useState, useEffect, useContext } from "react";
import FirebaseContext from "../context/firebase";

export default function useAuthListener() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });
  }, [firebase]);
  console.log(user);
  if (user) {
    const obj = {
      username: user?.displayName,
      email: user?.email,
      lastLogin: user?.metadata?.lastLoginAt,
      createdAt: user?.metadata?.createdAt,
    };
    return obj;
  } else return null;
}
