import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import BioDataTemplates from './components/BioDataTemplates';
import TemplatesSandBox from './components/BioDataTemplates/TemplatesSandBox';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import DefaultLayout from './components/organisms/DefaultLayout';
import TemplateSelection from './components/TemplateSelection';
import { LanguageProvider } from './contexts/LanguageContext';
import Features from './pages/Features';
import HowItWorks from './pages/HowItWorks';
import PaymentStatus from './pages/PaymentStatus';
import Privacy from './pages/Privacy';
import Refund from './pages/Refund';
import Terms from './pages/Terms';
import './i18n/config';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Routes WITH layout */}
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/features" element={<Features />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/refund" element={<Refund />} />
            <Route path="/form" element={<Home />} />
            <Route path="/sandbox" element={<BioDataTemplates />} />
          </Route>

          {/* Routes WITHOUT layout (PDF viewer and template selection) */}
          <Route path="/select-template" element={<TemplateSelection />} />
          <Route
            path="/template/:template_name"
            element={<TemplatesSandBox />}
          />
          <Route path="/payment-status" element={<PaymentStatus />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
