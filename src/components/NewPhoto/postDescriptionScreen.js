import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/user";
import Avatar from "../Avatar";
import EmojiPicker from "../EmojiPicker";

export default function PostDescriptionScreen({
  photo,
  setPlace,
  setDescription,
}) {
  const user = useContext(UserContext);

  const [text, setText] = useState("");

  useEffect(() => {
    if (text.length > 125) {
      setText(text.slice(0, 125));
    }
    setDescription(text);
  }, [text]);

  function textHandler(e) {
    const text = e.target.value;
    setText(text);
  }

  return (
    <div className="[height:60vh] flex">
      <div className="flex items-center [min-width:300px]">
        <img src={photo} className="max-h-full" />
      </div>
      <div className="h-full [width:40vh] [min-width:250px] border-l border-b border-gray-primary flex flex-col items-start">
        <div className="flex p-4 items-center">
          <Avatar user={user.username} size="8" />
          <p className="ml-3 font-semibold text-lg">{user.username}</p>
        </div>
        <textarea
          autoFocus
          placeholder="Write a caption..."
          className="h-1/2 w-full px-4 resize-none outline-none text-lg flex-grow"
          onChange={textHandler}
          value={text}
        />
        <div className="w-full p-2 flex justify-between relative transition-all duration-500">
          <EmojiPicker text={text} setText={setText} />
          <p className="text-gray-primary text-sm">{`${text.length}/125`}</p>
        </div>
        <input
          className="w-full px-4 py-3 outline-none text-lg border-t border-b border-gray-primary"
          onChange={(e) => setPlace(e.target.value)}
          maxLength="20"
          placeholder="Add a location"
        />
      </div>
    </div>
  );
}
