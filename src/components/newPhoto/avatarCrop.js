import { useEffect, useState } from "react";
import AvatarEditor from "react-avatar-editor";

export default function AvatarCrop({ photoUploaded }) {
  const [canvasSize, setCanvasSize] = useState({
    width: undefined,
    height: undefined,
  });

  function updateImageCrop(e) {
    console.log(e);
  }

  useEffect(() => {
    function handleResize() {
      const canvas = document.getElementById("canvas");
      console.log(canvas.offsetHeight, canvas.offsetWidth);
      setCanvasSize({
        height: canvas.offsetHeight,
        width: canvas.offsetWidth,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="canvas" className="h-full w-full">
      <AvatarEditor
        className="rounded-b-xl"
        image={photoUploaded}
        border={0}
        borderRadius={0}
        height={canvasSize.height}
        width={canvasSize.width}
        onPositionChange={updateImageCrop}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}
