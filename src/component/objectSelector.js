// ObjectSelector.js
import { useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import axios from "axios";

const ObjectSelector = ({ videoWidth, videoHeight, extractedFrame }) => {
  const [rect, setRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    isDrawing: false,
  });

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.evt;
    setRect({ ...rect, x: offsetX, y: offsetY, isDrawing: true });
  };

  const handleMouseMove = (e) => {
    if (!rect.isDrawing) return;
    const { offsetX, offsetY } = e.evt;
    setRect({
      ...rect,
      width: offsetX - rect.x,
      height: offsetY - rect.y,
    });
  };

  const handleMouseUp = () => {
    setRect({ ...rect, isDrawing: false });
    console.log(extractedFrame, rect);
    sendFrameToSAM2(extractedFrame, rect); // Send the frame and bounding box to SAM 2
  };

  // Send frame and bounding box data to SAM 2 API
  const sendFrameToSAM2 = async (imageBlob, boundingBox) => {
    const SAM2_API_URL = "https://api.your-sam2-endpoint.com/v1/segment"; // Change to your SAM 2 API

    const formData = new FormData();
    formData.append("image", imageBlob); // Frame as an image blob
    formData.append("boundingBox", JSON.stringify(boundingBox)); // Bounding box coordinates

    try {
      const response = await axios.post(SAM2_API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Segmentation Mask:", response.data.mask); // Handle response
    } catch (error) {
      console.error("Error sending frame to SAM 2:", error);
    }
  };

  return (
    <div className="w-full left-0 top-0 absolute">
      <Stage
        width={videoWidth}
        height={videoHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          <Rect
            x={rect.x}
            y={rect.y}
            width={rect.width}
            height={rect.height}
            fill="transparent"
            stroke="red"
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default ObjectSelector;
