import { useState } from "react";

import FileInputScreen from "./fileInputScreen";

export default function NewPhoto({ showOverlay, toggleOverlay }) {
  const testbutton = (
    <button className="bg-blue-medium h-full">Hello tehere!</button>
  );

  const [leftButton, setLeftButton] = useState(testbutton);
  const [rightButton, setRightButton] = useState(testbutton);
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
        <header className="flex justify-between items-stretch w-full h-12 border-gray-primary border-b text-lg font-semibold overflow-clip">
          <div>{leftButton}</div>
          <div className="self-center">{title}</div>
          <div className="inline-block">{rightButton}</div>
        </header>
        <div className="h-full flex flex-col items-center justify-center overflow-hidden">
          <FileInputScreen />
        </div>
      </div>
    </div>
  );
}
