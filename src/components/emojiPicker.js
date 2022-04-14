import { useState } from "react";
import { EmojiIcon } from "./icons";

export default function EmojiPicker({ text, setText }) {
  const [show, setShow] = useState(false);

  const emojis = [
    "😀",
    "😁",
    "😂",
    "😢",
    "🤣",
    "😃",
    "💯",
    "🎉",
    "😮",
    "👏",
    "🔥",
    "🥰",
  ];
  return (
    <>
      <button
        className="h-full self-center justify-self-center ml-2"
        onMouseEnter={() => setShow(true)}
      >
        <EmojiIcon />
      </button>
      {show && (
        <div
          onMouseLeave={() => setShow(false)}
          className="absolute bottom-0 left-0 bg-white rounded-xl shadow-xl w-48 h-32 grid grid-cols-4 grid-rows-3 align-middle"
        >
          {emojis.map((emoji) => (
            <button
              key={emoji}
              className="text-2xl h-full hover:bg-blue-medium rounded duration-200 active:text-lg active:duration-100"
              onClick={() => {
                if (text.length < 124) setText(text + emoji);
              }}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
