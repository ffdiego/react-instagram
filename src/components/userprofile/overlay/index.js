import { Link } from "react-router-dom";
import Avatar from "./avatar";
import Comment from "./comment";
import AddComment from "./addComment";

export default function Overlay({
  showOverlay,
  toggleOverlay,
  photo,
  profile,
  isFollowing,
}) {
  return (
    <div
      className={`bg-gray-overlay h-screen w-screen mt-16 pb-20 top-0 left-0 fixed px-20 flex items-center z-20 ${
        showOverlay || "hidden"
      }`}
      onClick={toggleOverlay}
    >
      {/* White Frame */}
      <div
        className="bg-white h-fit max-h-full mx-auto w-fit drop-shadow-2xl rounded-r-lg flex items-strech"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo (Left Side) */}
        <div className="flex items-center max-w-xl min-h-fit">
          <img className="max-h-full " src={photo?.imageSrc} />
        </div>

        {/* Information (Right Side) */}
        <div
          className="flex flex-col flex-shrink-0 justify-start flex-grow-0"
          style={{ width: "500px" }}
        >
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
          <div className="flex-grow">
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
          <div>
            {photo && (
              <AddComment docId={photo.docId} comments={photo.comments} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
