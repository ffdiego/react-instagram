import { Link } from "react-router-dom";

import Avatar from "../Avatar";
import Comment from "./comment";
import Actions from "./actions";
import AddComment from "../Post/addComment";
import { useEffect, useRef, useState } from "react";

export default function Info({ photo, profile }) {
  const commentInput = useRef(null);
  const commentListView = useRef(null);
  const [comments, setComments] = useState(photo.comments);

  const handleFocus = () => commentInput.current.focus();

  useEffect(() => {
    commentListView?.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  useEffect(() => {
    setComments(photo.comments);
  }, [photo]);

  return (
    <span className="flex flex-col flex-shrink-0 justify-start flex-grow-0 w-[500px]">
      {/* Header */}
      <div className="flex items-center p-4 px-3 border-b border-gray-primary">
        <Avatar user={profile.username} />
        <div className="ml-3 flex flex-col">
          <span>
            <Link
              to={`/${profile.username}`}
              className="font-bold text-sm mr-1"
            >
              {profile.username}
            </Link>
          </span>
          <span className="text-sm font-thin text-gray-base">
            {photo.place}
          </span>
        </div>
      </div>
      <div className="flex-grow overflow-auto max-h-full">
        <Comment
          author={profile.username}
          message={photo?.caption}
          created={photo?.dateCreated}
        />
        {comments.map((item) => (
          <Comment
            key={item.created}
            author={item.username}
            message={item.comment}
            created={item.created}
            commentListView={commentListView}
          />
        ))}
      </div>

      {photo && (
        <>
          <Actions photo={photo} handleFocus={handleFocus} />
          <AddComment
            docId={photo.docId}
            comments={comments}
            setComments={setComments}
            commentInput={commentInput}
          />
        </>
      )}
    </span>
  );
}
