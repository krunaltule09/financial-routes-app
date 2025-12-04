import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScanningProvider } from './context/ScanningContext';
import { SSEProvider } from './context/SSEContext';
import SSENavigationListener from './components/SSENavigationListener';
import routes from './routes';
import './App.css';

function App() {
  return (
    <ScanningProvider>
      <Router>
        <SSEProvider>
          <SSENavigationListener />
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
