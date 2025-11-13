import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './components/BioDataForm/components/LandingPage';
import BioDataTemplates from './components/BioDataTemplates';
import TemplatesSandBox from './components/BioDataTemplates/TemplatesSandBox';
import Home from './components/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<Home />} />
        <Route path="/sandbox" element={<BioDataTemplates />} />
        <Route path="/template/:template_name" element={<TemplatesSandBox />} />
      </Routes>
    </Router>
  );
};

export default App;
