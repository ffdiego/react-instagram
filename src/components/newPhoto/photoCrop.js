import { useEffect, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";

export default function PhotoCrop({ photo, setCrop }) {
  const [canvasSize, setCanvasSize] = useState({
    width: 500,
    height: 500,
  });

  const [zoom, setZoom] = useState(1);

  const editorRef = useRef(null);

  function handleScroll(e) {
    const zoomPerScroll = 0.1;
    let scrollUp = e.deltaY > 0 ? 1 : -1;
    let newZoom = zoom - scrollUp * zoomPerScroll;
    if (newZoom < 1) newZoom = 1;
    else if (newZoom > 2) newZoom = 2;
    setZoom(newZoom);
  }

  function imageReady() {
    const croppedImage = editorRef.current.getImage();
    setCanvasSize({ height: croppedImage.height, width: croppedImage.width });
    setCrop(croppedImage);
  }

  function updateImageCrop() {
    const croppedImage = editorRef.current.getImage();
    setCrop(croppedImage);
  }

  return (
    <div id="canvas" className="h-full w-full" onWheel={handleScroll}>
      <AvatarEditor
        ref={editorRef}
        image={photo}
        border={0}
        borderRadius={0}
        height={canvasSize.height}
        width={canvasSize.width}
        scale={zoom}
        onImageReady={imageReady}
        onMouseUp={updateImageCrop}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}
