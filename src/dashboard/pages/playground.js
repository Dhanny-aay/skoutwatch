import { useContext } from "react";
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
import CompleteTrack from "../components/completedTrack";
import ResultTrack from "../components/resultTrack";

const Playground = () => {
  const { activePage } = useContext(ActivePageContext);

  const componentMap = {
    Home: <Home />,
    segmentation: <UploadSeg />,
    tracking: <UploadTrack />,
    Select: <SelectObject />,
    ProcessingSeg: <ProcessingSeg />,
    ProcessingTrack: <ProcessingTrack />,
    CompleteSeg: <CompleteSeg />,
    CompleteTrack: <CompleteTrack />,
    ResultSeg: <ResultSeg />,
    ResultTrack: <ResultTrack />,
  };

  const ComponentToRender = componentMap[activePage] || null;

  return (
    <>
      <div className=" relative">
        <Navbar />
        <Sidebar />
        {ComponentToRender}
      </div>
    </>
  );
};

export default Playground;
