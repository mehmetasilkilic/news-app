import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="flex flex-col md:flex-row">
        <div className="z-10 md:w-72">
          <Sidebar />
        </div>
        <div className="z-1 h-full w-full">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
