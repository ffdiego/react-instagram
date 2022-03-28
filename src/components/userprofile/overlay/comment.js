import { Link } from "react-router-dom";
import Avatar from "./avatar";

export default function Comment({ author, message, posted }) {
  return (
    <div className="px-3 pt-1 pb-4 mt-1 mb-3">
      <div className="flex flex-initial">
        <Avatar username={author} />
        <p className="align-top">
          <a href={`/${author}`} className="mr-1 font-bold text-sm">
            {author}
          </a>
          {message}
        </p>
      </div>
    </div>
  );
}
