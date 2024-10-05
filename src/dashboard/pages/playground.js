import { useContext, useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { ActivePageContext } from "../contexts/demoPageContext";
import Home from "../components/home";
import UploadSeg from "../components/uploadSeg";
import UploadTrack from "../components/uploadTrack";
import SelectObject from "../components/select";
import ProcessingSeg from "../components/processingSeg";
import CompleteSeg from "../components/completeSeg";
import ResultSeg from "../components/resultSeg";
import ProcessingTrack from "../components/processingTrack";

import ResultTrack from "../components/resultTrack";
import CompleteTrack from "../components/completedTrack";

const Playground = () => {
  const { activePage } = useContext(ActivePageContext);

  // States to manage the active steps in segmentation and tracking
  const [segmentationStep, setSegmentationStep] = useState("segmentation");
  const [trackingStep, setTrackingStep] = useState("tracking");

  // Segmentation and tracking components
  const segmentationComponents = {
    segmentation: <UploadSeg setSegmentationStep={setSegmentationStep} />,
    Select: <SelectObject setSegmentationStep={setSegmentationStep} />,
    ProcessingSeg: <ProcessingSeg setSegmentationStep={setSegmentationStep} />,
    CompleteSeg: <CompleteSeg setSegmentationStep={setSegmentationStep} />,
    ResultSeg: <ResultSeg />,
  };

  const trackingComponents = {
    tracking: <UploadTrack setTrackingStep={setTrackingStep} />,
    ProcessingTrack: <ProcessingTrack setTrackingStep={setTrackingStep} />,
    CompleteTrack: <CompleteTrack setTrackingStep={setTrackingStep} />,
    ResultTrack: <ResultTrack />,
  };

  // Determine which flow is currently active (segmentation or tracking)
  const isSegmentationActive = activePage === "segmentation";
  const isTrackingActive = activePage === "tracking";

  return (
    <>
      <div className="relative">
        <Navbar />
        <Sidebar />

        {/* Home - Shown when neither segmentation nor tracking is active */}
        {!isSegmentationActive && !isTrackingActive && <Home />}

        {/* Segmentation Flow - Always mounted */}
        <div style={{ display: isSegmentationActive ? "block" : "none" }}>
          {segmentationComponents[segmentationStep]}
        </div>

        {/* Tracking Flow - Always mounted */}
        <div style={{ display: isTrackingActive ? "block" : "none" }}>
          {trackingComponents[trackingStep]}
        </div>
      </div>
    </>
  );
};

export default Playground;
