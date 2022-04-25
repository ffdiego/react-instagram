import { useState, useContext } from "react";
import PropTypes from "prop-types";
import UserContext from "../../context/user";
import { addCommentFB } from "../../services/firebase";

export default function AddComment({
  docId,
  comments,
  setComments,
  commentInput,
}) {
  const [comment, setComment] = useState("");
  const username = useContext(UserContext)?.username;

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!username) return;
    const created = new Date();
    setComments([...comments, { username, comment, created }]);
    setComment("");
    addCommentFB(username, comment, docId);
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(e) =>
          comment.length >= 1 ? handleSubmitComment(e) : e.preventDefault()
        }
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4 outline-none"
          placeholder={(username && "Add a comment...") || "Log in to comment"}
          type="text"
          name="add-comment"
          disabled={!username}
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${
            !comment && "opacity-25"
          }`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object,
};
