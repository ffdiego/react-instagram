import { Link } from "react-router-dom";

export default function Comment({ author, message, posted }) {
  return (
    <div className="px-3 pt-1 pb-4 mt-1 mb-3">
      <div className="flex flex-initial">
        <Link to={`/p/${author}`} className="flex-none">
          <img
            className="w-8 rounded-full mr-2"
            alt={`${author} avatar`}
            src={`/images/avatars/${author}.jpg`}
          />
        </Link>
        <p className="align-top">
          <a href={`/p/${author}`} className="mr-1 font-bold">
            {author}
          </a>
          {message}
        </p>
      </div>
    </div>
  );
}
