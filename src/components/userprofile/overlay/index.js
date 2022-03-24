import { Link } from "react-router-dom";
import Comment from "./comment";
import AddComment from "../../post/addComment";

export default function Overlay({
  showOverlay,
  toggleOverlay,
  photo,
  profile,
}) {
  return (
    <div
      className={`bg-gray-overlay h-screen w-screen top-0 left-0 fixed py-6 px-60 ${
        showOverlay || "hidden"
      }`}
      onClick={toggleOverlay}
    >
      {/* White Frame */}
      <div
        className="bg-white h-full mx-auto w-fit drop-shadow-2xl rounded-r-lg flex"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo (Left Side) */}
        <div className="h-full">
          <img className="h-full " src={photo?.imageSrc} />
        </div>

        {/* Information (Right Side) */}
        <div
          className="flex flex-col justify-start flex-grow-0"
          style={{ width: "500px" }}
        >
          {/* Header */}
          <div className="flex items-center p-4 border-b border-gray-primary">
            <Link to={`/p/${profile.username}`}>
              <img
                className="w-12 rounded-full mr-3"
                alt={`${profile.username} avatar`}
                src={`/images/avatars/${profile.username}.jpg`}
              />
            </Link>
            <div className="items-center">
              <Link to={`/p/${profile.username}`} className="font-bold text-sm">
                {profile.username}
              </Link>
            </div>
          </div>
          <div className="flex-grow">
            <Comment author={profile.username} message={photo?.caption} />
            {photo &&
              photo.comments.map((item) => (
                <Comment
                  key={item.comment}
                  author={item.displayName}
                  message={item.comment}
                />
              ))}
          </div>
          <div>
            <AddComment docId={photo?.docId} comments={photo?.comments} />
          </div>
        </div>
      </div>
    </div>
  );
}
