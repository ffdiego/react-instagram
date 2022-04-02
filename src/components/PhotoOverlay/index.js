import { Link } from "react-router-dom";
import Avatar from "./avatar";
import Comment from "./comment";
import Actions from "./actions";
import AddComment from "./addComment";

export default function PhotoOverlay({
  showOverlay,
  toggleOverlay,
  photo,
  profile,
  isFollowing,
}) {
  return (
    <div
      className={`bg-gray-overlay h-screen w-screen top-0 left-0 fixed px-20 flex items-center z-50 ${
        showOverlay || "hidden"
      }`}
      onClick={toggleOverlay}
    >
      {/* White Frame */}
      <div
        className="bg-white [max-height:90%] mx-auto drop-shadow-2xl rounded-r-lg flex"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo (Left Side) */}
        <span className="bg-black-light flex justify-center max-w-2xl">
          <img
            className="self-center h-auto max-h-full object-cover w-auto"
            src={photo?.imageSrc}
          />
        </span>

        {/* Information (Right Side) */}
        <span className="flex flex-col flex-shrink-0 justify-start flex-grow-0 w-[500px]">
          {/* Header */}
          <div className="flex items-center p-4 px-3 border-b border-gray-primary">
            <Avatar username={profile.username} />
            <div className="items-center">
              <Link
                to={`/${profile.username}`}
                className="font-bold text-sm mr-1"
              >
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
              <Actions />
              <AddComment docId={photo.docId} comments={photo.comments} />
            </>
          )}
        </span>
      </div>
    </div>
  );
}
