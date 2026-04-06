import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Basics from './pages/Basics';
import Checklist from './pages/Checklist';
import Resources from './pages/Resources';
import Calculators from './pages/Calculators';
import FindHelp from './pages/FindHelp';
import AiAssistant from './pages/AiAssistant';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="basics" element={<Basics />} />
          <Route path="checklist" element={<Checklist />} />
          <Route path="resources" element={<Resources />} />
          <Route path="calculators" element={<Calculators />} />
          <Route path="help" element={<FindHelp />} />
          <Route path="ai-assistant" element={<AiAssistant />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
