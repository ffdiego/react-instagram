import { PhotosUploadIcon } from "../Icons";
import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";

export default function AvatarCanvas({ photo, setPhoto, setCrop }) {
  function fileSelectedHandler(e) {
    setPhoto(e.target.files[0]);
  }

  function filePicker() {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = fileSelectedHandler;
    input.click();
  }

  return (
    <div className="[height:50vh] [width:50vh] flex flex-col items-center justify-center">
      {photo ? (
        <PhotoCrop photo={photo} setCrop={setCrop} />
      ) : (
        <>
          <PhotosUploadIcon />
          <p className="mt-5 mb-10 text-2xl font-thin">
            Change your profile avatar
          </p>
          <button
            className="bg-transparent  font-semibold py-2 px-4 border rounded transition-all duration-300
             border-blue-medium text-blue-medium
             hover:bg-blue-medium hover:text-white "
            onClick={filePicker}
          >
            Choose a photo
          </button>
        </>
      )}
    </div>
  );
}

function PhotoCrop({ photo, setCrop }) {
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
    updateImageCrop();
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
        borderRadius={3000}
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
