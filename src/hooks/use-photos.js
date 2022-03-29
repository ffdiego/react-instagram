import { getTime } from "date-fns";
import { useContext, useEffect, useState } from "react";
import user from "../components/sidebar/user";
import UserContext from "../context/user";
import { getPhotos, getUser } from "../services/firebase";

export default function usePhotos() {
  const [photos, setPhotos] = useState(null);
  const username = useContext(UserContext).username;

  useEffect(() => {
    async function getTimelinePhotos() {
      const { following } = await getUser(username);

      let followedUserPhotos = [];

      //does the user actually follows people?
      if (following?.length > 0) {
        followedUserPhotos = await getPhotos(username, following);
      }

      // reordenando array pra mostrar as fotos por ordem
      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followedUserPhotos);
    }
    if (username) {
      getTimelinePhotos();
    }
  }, [username]);

  return { photos };
}
