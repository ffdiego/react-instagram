import { useState, useEffect, useContext } from "react";
import FirebaseContext from "../context/firebase";
import { getUser } from "../services/firebase";

export default function useAuthListener() {
  //formated object thats returned
  const [formattedUser, setFormattedUser] = useState(null);
  //additional info about the user that gets updated after the initial authenthication
  const [moreinfo, setMoreinfo] = useState(null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });
  }, [firebase]);

  useEffect(() => {
    if (user) {
      setMoreinfo(getUser(user?.displayName));
      setFormattedUser({
        username: user?.displayName,
        email: user?.email,
        lastLogin: user?.metadata?.lastLoginAt,
        createdAt: user?.metadata?.createdAt,
      });
    } else {
      setMoreinfo(null);
      setFormattedUser(null);
    }
  }, [user]);

  useEffect(() => {
    if (user && moreinfo)
      moreinfo.then((res) => {
        setFormattedUser((prev) => ({
          ...prev,
          following: res.following,
          fullname: res.fullname,
        }));
      });
  }, [user, moreinfo]);

  return formattedUser;
}
