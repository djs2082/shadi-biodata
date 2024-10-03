import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import TemplatesSandBox from "./components/BioDataTemplates/TemplatesSandBox";
import BioDataTemplates from "./components/BioDataTemplates";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sandbox" element={<BioDataTemplates />} />
        <Route path="/template/:template_name" element={<TemplatesSandBox />} />
      </Routes>
    </Router>
  );
};

export default App;
