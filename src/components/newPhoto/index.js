import { useState } from "react";

import FileInputScreen from "./fileInputScreen";

export default function NewPhoto({ showOverlay, toggleOverlay }) {
  const [leftButton, setLeftButton] = useState(null);
  const [rightButton, setRightButton] = useState(null);
  const [title, setTitle] = useState("Create a new photo");

  return (
    <div
      className={`bg-gray-overlay h-screen w-screen top-0 left-0 fixed px-20 flex items-center z-50 ${
        showOverlay || "hidden"
      }`}
      onMouseDown={toggleOverlay}
    >
      <div
        className="bg-white [height:75vh] [min-height:300px] aspect-square mx-auto drop-shadow-2xl rounded-xl flex flex-col"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between w-full h-12 py-2 px-4 border-gray-primary border-b text-lg font-semibold">
          <div>{leftButton}</div>
          <div>{title}</div>
          <div>{rightButton}</div>
        </header>
        <div className="h-full flex flex-col items-center justify-center overflow-hidden">
          <FileInputScreen />
        </div>
      </div>
    </div>
  );
}
