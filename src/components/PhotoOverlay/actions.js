import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { likePhoto } from "../../services/firebase";
import UserContext from "../../context/user";

import { LikeIcon, CommentIcon } from "../Icons";

export default function Actions({ photo, handleFocus }) {
  const username = useContext(UserContext).username;
  const docId = photo.docId;

  const [toggleLiked, setToggleLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const handleToggleLiked = async () => {
    setToggleLiked((toggleLiked) => !toggleLiked);
    likePhoto(docId, username, toggleLiked);
    setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
  };

  useEffect(() => {
    setLikes(photo.likes.length);
    setToggleLiked(photo.likes.includes(username));
  }, [photo, username]);

  return (
    <>
      <div className="flex justify-between p-4 border-gray-primary border-t">
        <div className="flex">
          <LikeIcon onClick={handleToggleLiked} liked={toggleLiked} />
          <CommentIcon onClick={handleFocus} />
        </div>
      </div>
      <div className="p-4 py-0 pb-2">
        <p className="font-bold">
          {likes === 1 ? `${likes} like` : `${likes} likes`}
        </p>
      </div>
    </>
  );
}

Actions.propTypes = {
  photo: PropTypes.object.isRequired,
  handleFocus: PropTypes.func.isRequired,
};
