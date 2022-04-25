import { formatDistance } from "date-fns";
import Avatar from "../Avatar";

export default function Comment({ author, message, created, commentListView }) {
  console.log("time", created);
  const timeAgo = (created && formatDistance(created, new Date())) || null;

  return (
    <div className="px-3 pt-1 pb-4 mt-1 mb-3" ref={commentListView}>
      <div className="flex flex-initial">
        <Avatar user={author} />
        <div className="ml-3 align-top">
          <a href={`/${author}`} className="mr-1 font-bold text-sm">
            {author}
          </a>
          <p className="align-top">{message}</p>
          <p className="align-bottom text-sm text-gray-base font-extralight">
            {timeAgo} ago
          </p>
        </div>
      </div>
    </div>
  );
}
