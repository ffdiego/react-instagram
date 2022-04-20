import Avatar from "../Avatar";

export default function Comment({ author, message, posted, commentListView }) {
  return (
    <div className="px-3 pt-1 pb-4 mt-1 mb-3" ref={commentListView}>
      <div className="flex flex-initial">
        <Avatar user={author} />
        <p className="ml-3 align-top">
          <a href={`/${author}`} className="mr-1 font-bold text-sm">
            {author}
          </a>
          {message}
        </p>
      </div>
    </div>
  );
}
