import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScanningProvider } from './context/ScanningContext';
import { SSEProvider } from './context/SSEContext';
import SSENavigationListener from './components/SSENavigationListener';
import SSEStatusIndicator from './components/SSEStatusIndicator';
import routes from './routes';
import './App.css';

function App() {
  return (
    <ScanningProvider>
      <Router>
        <SSEProvider>
          {/* Enhanced navigation listener with alerts */}
          <SSENavigationListener />
          
          {/* Persistent status indicator */}
          <SSEStatusIndicator />
          
          <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          </Routes>
        </SSEProvider>
      </Router>
    </ScanningProvider>
  );
}

export default App;
