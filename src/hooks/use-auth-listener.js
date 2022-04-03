import { useState, useEffect, useContext } from "react";
import FirebaseContext from "../context/firebase";
import { getFollowing, getUser } from "../services/firebase";

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

  useEffect(() => {
    if (user) {
      setMoreinfo(getUser(user?.displayName));
      setFormattedUser({
        username: user?.displayName,
        email: user?.email,
        lastLogin: user?.metadata?.lastLoginAt,
        createdAt: user?.metadata?.createdAt,
      });
    }
  }, [user]);

  useEffect(() => {
    if (user && moreinfo)
      moreinfo.then((res) => {
        setFormattedUser({
          ...formattedUser,
          following: res.following,
          fullname: res.fullname,
        });
      });
  }, [user, moreinfo]);

  return formattedUser;
}
