import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import College from "./pages/College";
import Student from "./pages/Student";
import LocationCollege from "./pages/LocationCollege";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/college/:id" element={<College />} />
        <Route path="/student/:id" element={<Student />} />
        <Route path="/location/:state" element={<LocationCollege />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
