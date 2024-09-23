require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { uploadToAWS } = require("./s3upload");

const app = express();
app.use(express.json()); // Parse incoming JSON
app.use(cors()); // Enable CORS for all origins

// upload product image
app.post("/upload", uploadToAWS);

// Set up the Replicate API call route
app.post("/api/replicate", async (req, res) => {
  const {
    input_video,
    click_frames,
    click_labels,
    click_object_ids,
    click_coordinates,
    mask_type,
    video_fps,
    output_video,
    output_format,
    output_quality,
    annotation_type,
    output_frame_interval,
  } = req.body.input;

  try {
    const replicateResponse = await axios.post(
      "https://api.replicate.com/v1/predictions",
      {
        version:
          "33432afdfc06a10da6b4018932893d39b0159f838b6d11dd1236dff85cc5ec1d",
        input: {
          input_video,
          mask_type: mask_type || "greenscreen", // Set default mask_type
          video_fps: video_fps || 25, // Default fps to 25
          click_frames,
          click_labels,
          output_video: output_video || true, // Default output_video to true
          output_format: output_format || "webp", // Default output_format to webp
          output_quality: output_quality || 80, // Default output_quality to 80
          annotation_type: annotation_type || "mask", // Default annotation_type
          click_object_ids,
          click_coordinates,
          output_frame_interval: output_frame_interval || 1, // Default interval to 1
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(replicateResponse.data);
  } catch (error) {
    console.error("Error in Replicate API:", error.response);
    // res.status(500).json({ error: "Error processing image segmentation" });
    res
      .status(error.response.status)
      .json({ error: error.response.statusText });
  }
});

// Route to handle the "Get" request
app.post("/api/get-segmentation", async (req, res) => {
  const { getUrl } = req.body; // Get the URL from the request body

  try {
    // Make the request to the external API using axios
    const response = await axios.get(getUrl, {
      headers: {
        Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
      },
    });

    // Send the response data back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error("Error making request to external API:", error.message);
    res.status(500).json({ error: "Error making request to external API" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
