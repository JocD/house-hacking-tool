import React from 'react';
import SaveLoadConfig from './SaveLoadConfig';
import '../styles/App.css';

const App: React.FC = () => {
  return (
    <div className="main-grid">
      <h1>Comprehensive House Hacking Analyzer</h1>
      <SaveLoadConfig />
    </div>
  );
};

export default App;
