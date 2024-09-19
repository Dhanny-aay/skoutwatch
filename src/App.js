import { Routes, Route, useLocation } from "react-router-dom";
import Prototype from "./pages/prototype";
import { useEffect } from "react";
import Landing from "./pages/landing";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/prototype" element={<Prototype />} />
      </Routes>
    </>
  );
}

export default App;
