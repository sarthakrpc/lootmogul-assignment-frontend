import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/cat" element={<>cat</>} />
        <Route path="/dog" element={<>dog</>} />
        <Route path="/bat" element={<>bat</>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
