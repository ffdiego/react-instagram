import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { LikeIconFull, CommentIconFull } from "../Icons";

export default function Photos({ photos, toggleOverlay }) {
  return (
    <div className="mt-8">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4 mb-12">
        {!photos ? (
          <>
            <Skeleton width={320} height={320} />
            <Skeleton width={320} height={320} />
            <Skeleton width={320} height={320} />
          </>
        ) : photos.length > 0 ? (
          photos.map((photo) => (
            <div
              key={photo.docId}
              className="relative group"
              onClick={(e) => {
                toggleOverlay(e, photo);
              }}
            >
              <img src={photo.imageSrc} alt={photo.caption} />
              <div className="absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden">
                <p className="flex items-center text-white font-bold">
                  <LikeIconFull />
                  {photo.likes.length}
                </p>
                <p className="flex items-center text-white font-bold">
                  <CommentIconFull />
                  {photo.comments.length}
                </p>
              </div>
            </div>
          ))
        ) : null}
      </div>
      {!photos ||
        (photos.length === 0 && (
          <p className="text-center text-2xl">No Photos Published Yet</p>
        ))}
    </div>
  );
}

Photos.propTypes = {
  photos: PropTypes.array,
};
