import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import BioDataTemplates from './components/BioDataTemplates';
import TemplatesSandBox from './components/BioDataTemplates/TemplatesSandBox';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import TemplateSelection from './components/TemplateSelection';
import DefaultLayout from './components/organisms/DefaultLayout';
import { LanguageProvider } from './contexts/LanguageContext';
import './i18n/config';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Routes WITH layout */}
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/form" element={<Home />} />
            <Route path="/sandbox" element={<BioDataTemplates />} />
          </Route>

          {/* Routes WITHOUT layout (PDF viewer and template selection) */}
          <Route path="/select-template" element={<TemplateSelection />} />
          <Route path="/template/:template_name" element={<TemplatesSandBox />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
