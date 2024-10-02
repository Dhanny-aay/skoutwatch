import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Landing from "./pages/landing";
import Upload from "./dashboard/pages/upload";
import PrototypeV1 from "./dashboard/pages/prototypev1";
import ProdUpload from "./dashboard/pages/prodUpload";
import MakeChoie from "./dashboard/pages/choice";
import Processing from "./dashboard/pages/processing";
import CompletedPrompt from "./dashboard/pages/completedPrompt";
import Result from "./dashboard/pages/result";
import Select from "./dashboard/pages/select";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/prototype" element={<PrototypeV1 />} />
        <Route path="/upload" element={<Upload />} />

        {/* fake Pages  */}
        <Route path="/uploadv1" element={<ProdUpload />} />
        <Route path="/choicev1" element={<MakeChoie />} />
        <Route path="/select" element={<Select />} />
        <Route path="/processing" element={<Processing />} />
        <Route path="/complete" element={<CompletedPrompt />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </>
  );
}

export default App;
