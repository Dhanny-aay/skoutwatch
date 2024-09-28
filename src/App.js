import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Landing from "./pages/landing";
import Upload from "./dashboard/pages/upload";
import PrototypeV1 from "./dashboard/pages/prototypev1";

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
      </Routes>
    </>
  );
}

export default App;
