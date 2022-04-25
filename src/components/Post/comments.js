import { useState } from "react";
import PropTypes from "prop-types";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import AddComment from "./addComment";

export default function Comments({
  docId,
  comments: allComments,
  posted,
  commentInput,
  toggleOverlay,
  photo,
}) {
  const [comments, setComments] = useState(allComments);
  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments.length >= 3 && (
          <p
            className="text-sm text-gray-base mb-1 cursor-pointer"
            onClick={(e) => toggleOverlay(e, photo)}
          >
            View all comments
          </p>
        )}
        {comments.slice(0, 3).map((item) => (
          <p key={`${item.comment} - ${item.username}`} className="mb-1">
            <Link to={`/${item.username}`}>
              <span className="mr-1 font-bold">{item.username}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        <p
          className="text-gray-base uppercase text-xs mt-2 cursor-pointer"
          onClick={(e) => toggleOverlay(e, photo)}
        >
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
}

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired,
};
