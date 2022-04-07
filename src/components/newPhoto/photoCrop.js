import { useEffect, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";

export default function PhotoCrop({ photo, setCrop }) {
  const [canvasSize, setCanvasSize] = useState({
    width: 0,
    height: 0,
  });

  const editorRef = useRef(null);

  function updateImageCrop() {
    const croppedImage = editorRef.current.getImage();
    setCrop(croppedImage);
  }

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    function handleResize() {
      setCanvasSize({
        height: canvas.clientHeight,
        width: canvas.clientWidth,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="canvas" className="h-full w-full">
      <AvatarEditor
        ref={editorRef}
        image={photo}
        border={0}
        borderRadius={0}
        height={canvasSize.height}
        width={canvasSize.width}
        onImageReady={updateImageCrop}
        onPositionChange={updateImageCrop}
        style={{ height: canvasSize.height, width: canvasSize.width }}
      />
    </div>
  );
}
