import { useState } from "react";
import { Stage, Layer, Rect } from "react-konva";

const ObjectSelector = ({
  videoWidth,
  videoHeight,
  canvasRef,
  onSegmentationResponse,
  videoSrc,
}) => {
  const [rect, setRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    isDrawing: false,
  });

  const sendToSam2 = async (boundingBox) => {
    try {
      const response = await fetch("http://localhost:5000/api/replicate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            mask_type: "greenscreen",
            video_fps: 50,
            input_video: videoSrc,
            click_frames: "1",
            click_labels: "1",
            output_video: true,
            output_format: "webp",
            output_quality: 80,
            annotation_type: "mask",
            click_object_ids: "object_1",
            click_coordinates: `[${boundingBox.x}, ${boundingBox.y}]`,
            output_frame_interval: 1,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${
            errorData.detail || "Unknown error"
          }`
        );
      }

      const data = await response.json();
      console.log("Segmentation Result:", data);

      // Pass the result back to the parent component
      onSegmentationResponse(data);
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

    // Normalize coordinates relative to the canvas size and video resolution
    const normalizedBoundingBox = {
      x: (rect.x / videoWidth) * videoWidth,
      y: (rect.y / videoHeight) * videoHeight,
      width: (rect.width / videoWidth) * videoWidth,
      height: (rect.height / videoHeight) * videoHeight,
    };

    // Send normalized coordinates to SAM
    console.log(normalizedBoundingBox);
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
