import { Link } from "react-router-dom";

import Avatar from "./avatar";
import Comment from "./comment";
import Actions from "./actions";
import AddComment from "./addComment";

export default function Info({ photo, profile }) {
  return (
    <span className="flex flex-col flex-shrink-0 justify-start flex-grow-0 w-[500px]">
      {/* Header */}
      <div className="flex items-center p-4 px-3 border-b border-gray-primary">
        <Avatar username={profile.username} />
        <div className="items-center">
          <Link to={`/${profile.username}`} className="font-bold text-sm mr-1">
            {profile.username}
          </Link>
          • <span className="font-bold text-blue-medium">Follow</span>
        </div>
      </div>
      <div className="flex-grow overflow-auto max-h-full">
        <Comment author={profile.username} message={photo?.caption} />
        {photo &&
          photo.comments.map((item) => (
            <Comment
              key={item.comment}
              author={item.username}
              message={item.comment}
            />
          ))}
      </div>

      {photo && (
        <>
          <Actions photo={photo} handleFocus={handleFocus} />
          <AddComment
            docId={photo.docId}
            comments={photo.comments}
            commentInput={commentInput}
          />
        </>
      )}
    </span>
  );
}
