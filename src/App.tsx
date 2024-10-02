import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import TemplatesSandBox from './components/BioDataTemplates/TemplatesSandBox';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sandbox/:template_name' element={<TemplatesSandBox />} />
      </Routes>
    </Router>
  );
};

export default App;
