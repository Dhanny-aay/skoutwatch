import { useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import Replicate from "replicate";

const ObjectSelector = ({ videoWidth, videoHeight, canvasRef }) => {
  const [rect, setRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    isDrawing: false,
  });

  const replicate = new Replicate({
    auth: process.env.REACT_APP_REPLICATE_API_TOKEN,
  });

  // Function to send frame and bounding box to SAM 2
  const sendToSam2 = async (imageData, boundingBox) => {
    try {
      const output = await replicate.run("meta/sam-2-video", {
        input: {
          image: imageData, // Sending compressed image
          click_coordinates: `[${boundingBox.x}, ${boundingBox.y}]`, // top-left corner of bounding box
          click_labels: "1",
          click_frames: "0",
          click_object_ids: "object_1",
        },
      });
      console.log("Segmentation Result: ", output);
    } catch (error) {
      console.error("Error in SAM 2:", error);
    }
  };

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

  const handleMouseUp = async () => {
    setRect({ ...rect, isDrawing: false });

    // Extract the current frame as a data URL
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL("image/jpeg", 0.8); // Compressing at 80% quality

    const boundingBox = {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
    };

    // Send frame and bounding box to SAM 2
    sendToSam2(imageData, boundingBox);
  };

  return (
    <div className="w-full absolute top-0 left-0">
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
