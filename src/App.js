import { Routes, Route, useLocation } from "react-router-dom";
import Prototype from "./pages/prototype";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Prototype />} />
      </Routes>
    </>
  );
}

export default App;
