import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";
import Post from "./post";

export default function Timeline() {
  // we need to get the logged in user's photos (hook)
  const { photos } = usePhotos();
  // on loading the photos, we need to use react skeleton
  // if we have photos, render them (create a post component)
  // if the usar has no photos, tell them to create some photos

  return (
    <div className="container col-span-2">
      {!photos ? (
        <>
          <Skeleton className="mb-5" count={4} height={500} />
        </>
      ) : photos?.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className="text-center text-2xl">Follow people to see photos</p>
      )}
    </div>
  );
}
